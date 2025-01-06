import { Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MeetingTimeDisplayProps {
  isSource: boolean;
  time: string;
  onTimeChange?: (time: string) => void;
  className?: string; // Added className prop
}

export const MeetingTimeDisplay = ({ isSource, time, onTimeChange, className }: MeetingTimeDisplayProps) => {
  return (
    <div className="flex flex-col space-y-2 p-4 rounded-md bg-primary/10">
      {isSource ? (
        <>
          <span className="text-sm font-medium text-muted-foreground">Set Meeting Time</span>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <Input
              type="time"
              value={time}
              onChange={(e) => onTimeChange?.(e.target.value)}
              className="w-32"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Select the time when you want to schedule the meeting
          </p>
        </>
      ) : (
        <>
          <span className="text-sm font-medium text-muted-foreground">Equivalent Meeting Time</span>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className={`text-2xl font-bold text-primary ${className}`}>
              {time}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This is when the meeting will happen in this time zone
          </p>
        </>
      )}
    </div>
  );
};