import { FileText } from "lucide-react";
import TagList from "./TagList";
import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect } from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for PDF.js using local worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

interface DocumentPreviewProps {
  content: string;
  title: string;
  isPdf?: boolean;
  highlightText?: string;
}

const DocumentPreview = ({ content, title, isPdf = false, highlightText = '' }: DocumentPreviewProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfDocument, setPdfDocument] = useState<any>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfDocument(pdfDocument);
  };

  useEffect(() => {
    if (highlightText && pdfDocument) {
      const textLayer = document.querySelector('.react-pdf__Page__textContent');
      if (textLayer) {
        const textContent = textLayer.textContent || '';
        const regex = new RegExp(highlightText, 'gi');
        const highlightedText = textContent.replace(regex, (match) => `<mark>${match}</mark>`);
        textLayer.innerHTML = highlightedText;
      }
    }
  }, [highlightText, pageNumber, pdfDocument]);

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