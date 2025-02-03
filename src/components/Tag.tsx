import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

const Tag = ({ label, onRemove, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full",
        "bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-primary/20 rounded-full p-0.5"
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};

export default Tag;