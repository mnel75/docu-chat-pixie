import DocumentPreview from "@/components/DocumentPreview";
import ChatPanel from "@/components/ChatPanel";

const Index = () => {
  const sampleDocument = {
    title: "Sample Document",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 border-r">
        <DocumentPreview
          title={sampleDocument.title}
          content={sampleDocument.content}
        />
      </div>
      <div className="w-1/2">
        <ChatPanel />
      </div>
    </div>
  );
};

export default Index;