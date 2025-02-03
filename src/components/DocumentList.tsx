import { FileText, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  content: string;
  isPdf: boolean;
}

interface DocumentListProps {
  documents: Document[];
  selectedDocument?: Document;
  onSelectDocument: (document: Document) => void;
  searchText?: string;
}

const DocumentList = ({ documents, selectedDocument, onSelectDocument, searchText }: DocumentListProps) => {
  const isDocumentMatching = (doc: Document) => {
    if (!searchText) return false;
    // For PDF documents, we can't search content directly
    // For text documents, search in content
    if (!doc.isPdf) {
      return doc.content.toLowerCase().includes(searchText.toLowerCase());
    }
    return false;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="text-primary" />
          Documents
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDocument(doc)}
            className={cn(
              "w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left mb-2",
              selectedDocument?.id === doc.id && "bg-muted",
              isDocumentMatching(doc) && "ring-2 ring-primary"
            )}
          >
            <File className={cn(
              "text-primary",
              isDocumentMatching(doc) && "animate-pulse"
            )} size={20} />
            <span className="truncate">{doc.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;