import { useState } from "react";
import { TimeZoneCard } from "@/components/TimeZoneCard";
import { AddTimeZoneButton } from "@/components/AddTimeZoneButton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const Index = () => {
  const [targetTimeZones, setTargetTimeZones] = useState([1]);
  const [sourceTime, setSourceTime] = useState("");
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const { toast } = useToast();

  const handleAddTimeZone = () => {
    if (targetTimeZones.length >= 4) {
      toast({
        title: "Maximum time zones reached",
        description: "You can only add up to 4 team member time zones.",
        variant: "destructive",
      });
      return;
    }
    setTargetTimeZones([...targetTimeZones, targetTimeZones.length + 1]);
  };

  const handleRemoveTimeZone = (id: number) => {
    setTargetTimeZones(targetTimeZones.filter(zoneId => zoneId !== id));
  };

  const handleSourceTimeZoneChange = (timezone: string) => {
    console.log("Source time zone changed:", timezone);
    setSourceTimezone(timezone);
  };

  const handleSourceTimeChange = (time: string) => {
    console.log("Source time changed:", time);
    setSourceTime(time);
  };

  const handleShare = async () => {
    const meetingTime = sourceTime || new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    let shareText = `🌍 Meeting Time Zones Summary:\n\n`;
    shareText += `📅 Meeting Time: ${meetingTime} (${sourceTimezone})\n\n`;
    shareText += `Team Members' Local Times:\n`;
    
    // Get all timezone cards including source
    const cards = document.querySelectorAll('.time-zone-card');
    cards.forEach((card) => {
      const locationText = card.querySelector('.location-text')?.textContent;
      const timeText = card.querySelector('.time-text')?.textContent;
      if (locationText && timeText) {
        shareText += `${locationText}: ${timeText}\n`;
      }
    });

    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Time zones summary has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Remote Team Meeting Planner</h1>
          <p className="text-lg text-gray-600 mb-2">
            Plan meetings across different time zones with ease
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Set your meeting time and see what time it will be for your team members around the world
          </p>
          <Button 
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Share2 className="h-4 w-4" />
            Share Time Zones
          </Button>
        </div>

        <div className="grid gap-6 mb-8">
          <TimeZoneCard 
            isSource 
            onTimeZoneChange={handleSourceTimeZoneChange}
            onTimeChange={handleSourceTimeChange}
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Team Members' Time Zones</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {targetTimeZones.map((id) => (
            <TimeZoneCard 
              key={id}
              sourceTime={sourceTime}
              sourceTimezone={sourceTimezone}
              onRemove={() => handleRemoveTimeZone(id)}
            />
          ))}
          {targetTimeZones.length < 4 && (
            <AddTimeZoneButton onClick={handleAddTimeZone} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;