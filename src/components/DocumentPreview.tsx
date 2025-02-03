import { FileText } from "lucide-react";
import TagList from "./TagList";

interface DocumentPreviewProps {
  content: string;
  title: string;
}

const DocumentPreview = ({ content, title }: DocumentPreviewProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-primary" size={24} />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <TagList initialTags={["document", "chat"]} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;