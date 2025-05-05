from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil, os, uuid
import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global memory store (temporary)
pdf_chunks_store = {}
faiss_index_store = {}
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

@app.get("/")
async def root():
    return {"message": "Welcome to the PDF Q&A API!"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = f"pdfs/{filename}"
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Extract text
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()

    # Chunk text
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_text(text)
    embeddings = embedding_model.encode(chunks)

    # Save chunks and index
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(np.array(embeddings))

    pdf_chunks_store[filename] = chunks
    faiss_index_store[filename] = index

    return {"filename": filename, "message": "PDF uploaded and processed."}

class AskRequest(BaseModel):
    question: str
    filename: str

@app.post("/ask")
async def ask_question(data: AskRequest):
    question_embedding = embedding_model.encode([data.question])
    index = faiss_index_store.get(data.filename)
    chunks = pdf_chunks_store.get(data.filename)

    if not index or not chunks:
        return {"error": "Document not found."}

    # Get top 5 chunks
    D, I = index.search(np.array(question_embedding), k=2)  # Retrieve top 5 instead of top 3
    relevant_chunks = [chunks[i] for i in I[0]]

    # Filter short duplicates and join nicely
    unique_chunks = []
    for chunk in relevant_chunks:
        if chunk.strip() not in unique_chunks and len(chunk.strip()) > 20:
            unique_chunks.append(chunk.strip())

    # Combine chunks for a more coherent answer
    answer = "\n\n---\n\n".join(unique_chunks)

    # Optionally, you can run a simple summarizer here or generate an answer from the chunks.
    # For example, a summarizer could condense long answers or eliminate redundant information.
    answer = summarize_answer(answer)

    return {"answer": answer}

def summarize_answer(answer: str):
    # Simple summary function (for example, you could use GPT or an extractive summarizer)
    # Currently just truncates the answer for brevity (You can replace this with a real model)
    return answer[:200]  # Return the first 500 characters as a simplified answer