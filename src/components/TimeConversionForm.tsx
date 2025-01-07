import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TimeConversionFormProps {
  query: string;
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
}

export const TimeConversionForm = ({
  query,
  isLoading,
  onQueryChange,
  onSubmit,
}: TimeConversionFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Ask me about time conversions..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full bg-black/30 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-[#9b87f5] focus-visible:ring-offset-0"
      />
      <Button 
        onClick={onSubmit} 
        disabled={isLoading}
        className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          "Send Query"
        )}
      </Button>
    </div>
  );
};