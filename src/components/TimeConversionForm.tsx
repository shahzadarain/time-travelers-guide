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
    <div className="space-y-2">
      <Input
        placeholder="Example: What time is 3:00 PM in Paris when it's that time in Tokyo?"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full"
      />
      <Button 
        onClick={onSubmit} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Converting..." : "Convert Time"}
      </Button>
    </div>
  );
};