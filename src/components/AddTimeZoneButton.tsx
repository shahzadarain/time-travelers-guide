import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddTimeZoneButtonProps {
  onClick: () => void;
}

export const AddTimeZoneButton = ({ onClick }: AddTimeZoneButtonProps) => {
  return (
    <Button
      variant="outline"
      className="w-full h-[200px] border-dashed animate-fade-in hover:border-primary"
      onClick={onClick}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Time Zone
    </Button>
  );
};