import { Clock } from "lucide-react";

interface CurrentTimeDisplayProps {
  time: string;
}

export const CurrentTimeDisplay = ({ time }: CurrentTimeDisplayProps) => {
  return (
    <div className="flex flex-col space-y-2 p-4 rounded-md bg-secondary/50">
      <span className="text-sm font-medium text-muted-foreground">Current Local Time</span>
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-lg font-semibold text-primary">
          {time}
        </span>
      </div>
    </div>
  );
};