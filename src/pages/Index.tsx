import DocumentPreview from "@/components/DocumentPreview";
import ChatPanel from "@/components/ChatPanel";
import { useState } from "react";

const Index = () => {
  const [highlightText, setHighlightText] = useState("");
  
  const sampleDocument = {
    title: "Sample PDF Document",
    content: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Example PDF URL
    isPdf: true
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 border-r">
        <DocumentPreview
          title={sampleDocument.title}
          content={sampleDocument.content}
          isPdf={sampleDocument.isPdf}
          highlightText={highlightText}
        />
      </div>
      <div className="w-1/2">
        <ChatPanel onHighlightText={setHighlightText} />
      </div>
    </div>
  );
};

export default Index;