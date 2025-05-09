
import DocumentPreview from "@/components/DocumentPreview";
import ChatPanel from "@/components/ChatPanel";
import DocumentList from "@/components/DocumentList";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
    { field: "PatientName", value: "Manel Crespo", context: "el pacient manel crespo" },
    { field: "PatientAge", value: "50", context: "amb la data de naixement 27/03/1975" },
    { field: "DoctorName", value: "Dr. Jose Guitart", context: "el dr. Jose guitart ha tractat" },
    { field: "Speciality", value: "Psicologist", context: "la especialitat de Psicologia" },
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
          <h1 className="text-2xl font-bold text-primary mb-1">
            {selectedDocument.title}
            <span className="font-mono bg-muted ml-3 px-2 py-0.5 rounded text-base align-middle">ID: {selectedDocument.id}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Interactive document viewer with chat capabilities. Search and highlight text across your documents.
          </p>
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
          {/* Center Tabs */}
          <div className="w-1/2 border-r flex flex-col">
            <Tabs defaultValue="document" className="flex-1 flex flex-col h-full">
              <TabsList className="mb-2 mx-4 mt-4">
                <TabsTrigger value="document">Document</TabsTrigger>
                <TabsTrigger value="variables">Variables</TabsTrigger>
                <TabsTrigger value="tractament">Tractament Detected in Document</TabsTrigger>
              </TabsList>
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="document" className="h-full">
                  <DocumentPreview
                    title={selectedDocument.title}
                    content={selectedDocument.content}
                    isPdf={selectedDocument.isPdf}
                    highlightText={highlightText}
                  />
                </TabsContent>
                <TabsContent value="variables" className="h-full">
                  <div className="p-4 text-muted-foreground">
                    <p className="mb-2 text-lg font-semibold">Variables</p>
                    <p className="italic">No extracted variables available yet.</p>
                  </div>
                </TabsContent>
                <TabsContent value="tractament" className="h-full">
                  <div className="p-4 text-muted-foreground">
                    <p className="mb-2 text-lg font-semibold">Tractament Detected</p>
                    <p className="italic">No tractament information detected in this document.</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="flex-1">
              <ChatPanel onHighlightText={handleHighlightText} />
            </div>
            {/* Table with fields and filled indicators */}
            <div className="border-t p-4">
              <h3 className="text-lg font-semibold mb-3">Document Fields Context</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Context</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fieldStatus.map((status) => (
                    <TableRow key={status.field}>
                      <TableCell>{status.field}</TableCell>
                      <TableCell>{status.Value}</TableCell>
                      <TableCell>{status.Context}</TableCell>
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
