import { useState } from "react";
import Tag from "./Tag";

interface TagListProps {
  initialTags?: string[];
}

const TagList = ({ initialTags = [] }: TagListProps) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [input, setInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            label={tag}
            onRemove={() => removeTag(index)}
          />
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Add tag..."
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default TagList;