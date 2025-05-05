
# PDF QA Application

Welcome to the PDF QA Application! This app allows users to upload PDF files and ask questions based on their content. It’s built with **FastAPI** on the backend, **React.js** for the frontend, and leverages **LangChain** (or **LlamaIndex**) for NLP capabilities to answer your questions.

## Key Features

- Upload PDFs and ask questions about their content.
- **FastAPI** powers the backend with smooth and fast API endpoints.
- A dynamic **React.js** frontend for an interactive experience.
- NLP processing powered by **LangChain** (or **LlamaIndex**) to extract and answer content-based questions.
- Store document metadata in a database (**SQLite** or **PostgreSQL**).
- Files can be stored locally or in the cloud (e.g., **AWS S3**).

## Tech Stack

- **Frontend**: React.js
- **Backend**: FastAPI
- **NLP Processing**: LangChain / LlamaIndex
- **Database**: SQLite / PostgreSQL (your choice)
- **File Storage**: Local or cloud storage (e.g., AWS S3)
- **Virtual Environment**: Python 3.12

## Getting Started

### Setting Up the Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/niteshsainicoder/pdf_qa.git
    ```
2. Navigate to the backend folder:
    ```bash
    cd backend
    ```
3. Create a virtual environment:
    ```bash
    python3 -m venv .venv
    ```
4. Activate the virtual environment:
    - On Windows:
      ```bash
      .venv\Scripts\activate
      ```
    - On Linux/Mac:
      ```bash
      source .venv/bin/activate
      ```
5. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Setting Up the Frontend

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```

### Running the Application

- To start the backend:
  ```bash
  uvicorn backend.main:app --reload
  ```
- To start the frontend:
  ```bash
  npm start
  ```

## Database Configuration

By default, the app uses **SQLite**, but you can switch to **PostgreSQL** by updating the `DATABASE_URL` in the backend configuration.

## How It Works

1. **Upload a PDF**: Users can upload a PDF through the frontend.
2. **Processing the PDF**: The backend processes the uploaded PDF using **LangChain** or **LlamaIndex** to extract the text content.
3. **Ask a Question**: Users can ask any question related to the PDF content, and the app will use the NLP model to provide an accurate answer.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

