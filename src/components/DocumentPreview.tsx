import { FileText } from "lucide-react";
import TagList from "./TagList";
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentPreviewProps {
  content: string;
  title: string;
  isPdf?: boolean;
}

const DocumentPreview = ({ content, title, isPdf = false }: DocumentPreviewProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-primary" size={24} />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <TagList initialTags={["document", "chat", "pdf"]} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {isPdf ? (
          <div className="flex flex-col items-center">
            <Document
              file={content}
              onLoadSuccess={onDocumentLoadSuccess}
              className="max-w-full"
            >
              <Page 
                pageNumber={pageNumber} 
                className="max-w-full"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
                className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <button
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= numPages}
                className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;