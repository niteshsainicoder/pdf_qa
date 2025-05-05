import React from 'react';
import { FileText, Upload } from 'lucide-react';

interface HeaderProps {
  onUploadPDF: () => void;
  pdfName: string | null;
}

const Header: React.FC<HeaderProps> = ({ onUploadPDF,pdfName }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200  h-20">
      <div className="flex items-center gap-2">
        <img src="/AI Planet Logo.svg" alt="" />
      </div>
      
      <div className="flex gap-3">
        <button 
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
        >
       {pdfName}<FileText size={16} />
        </button>
        
        <button 
          onClick={onUploadPDF}
          className="flex items-center gap-1.5 text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Upload size={16} />
          <span>Upload PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Header;