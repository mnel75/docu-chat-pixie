import DocumentPreview from "@/components/DocumentPreview";
import ChatPanel from "@/components/ChatPanel";
import DocumentList from "@/components/DocumentList";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

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

  // Sample field status data
  const fieldStatus = [
    { field: "Title", filled: true, required: true },
    { field: "Age", filled: false, required: true },
    { field: "Name", filled: true, required: true },
    { field: "Center", filled: false, required: false },
    { field: "Doctor", filled: true, required: true },
    { field: "Category", filled: false, required: true },
  ];

  const [selectedDocument, setSelectedDocument] = useState(documents[0]);

  const handleHighlightText = (text: string) => {
    setHighlightText(text);
    console.log("Searching for text in documents:", text);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b p-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-primary mb-1">Document Chat Assistant</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono bg-muted px-2 py-0.5 rounded">ID: {selectedDocument.id}</span>
            <span>•</span>
            <p className="text-sm">
              Interactive document viewer with chat capabilities. Search and highlight text across your documents.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
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
          <div className="w-1/2 flex flex-col">
            <div className="flex-1">
              <ChatPanel onHighlightText={handleHighlightText} />
            </div>
            <div className="border-t p-4">
              <h3 className="text-lg font-semibold mb-3">Document Fields Status</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldStatus.map((status) => (
                    <TableRow key={status.field}>
                      <TableCell>{status.field}</TableCell>
                      <TableCell>
                        {status.filled ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span>Filled</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            <span>Empty</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {status.required ? (
                          <span className="text-red-600">Required</span>
                        ) : (
                          <span className="text-muted-foreground">Optional</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;