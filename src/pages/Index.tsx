import DocumentPreview from "@/components/DocumentPreview";
import ChatPanel from "@/components/ChatPanel";
import DocumentList from "@/components/DocumentList";
import { useState } from "react";

const Index = () => {
  const [highlightText, setHighlightText] = useState("");
  
  // Sample documents array
  const documents = [
    {
      id: "1",
      title: "Sample PDF Document",
      content: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      isPdf: true
    },
    {
      id: "2",
      title: "Getting Started Guide",
      content: "This is a sample text document content that talks about getting started with our application. You can search for specific terms in this document.",
      isPdf: false
    },
    {
      id: "3",
      title: "User Manual",
      content: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      isPdf: true
    }
  ];

  const [selectedDocument, setSelectedDocument] = useState(documents[0]);

  const handleHighlightText = (text: string) => {
    setHighlightText(text);
    console.log("Searching for text in documents:", text);
  };

  return (
    <div className="h-screen flex">
      <div className="w-64 border-r">
        <DocumentList
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={setSelectedDocument}
          searchText={highlightText}
        />
      </div>
      <div className="flex-1 flex">
        <div className="w-1/2 border-r">
          <DocumentPreview
            title={selectedDocument.title}
            content={selectedDocument.content}
            isPdf={selectedDocument.isPdf}
            highlightText={highlightText}
          />
        </div>
        <div className="w-1/2">
          <ChatPanel onHighlightText={handleHighlightText} />
        </div>
      </div>
    </div>
  );
};

export default Index;