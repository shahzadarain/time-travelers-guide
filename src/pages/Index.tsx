import { useState } from "react";
import { TimeZoneCard } from "@/components/TimeZoneCard";
import { AddTimeZoneButton } from "@/components/AddTimeZoneButton";
import { useToast } from "@/components/ui/use-toast";

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Remote Team Meeting Planner</h1>
          <p className="text-lg text-gray-600 mb-2">
            Plan meetings across different time zones with ease
          </p>
          <p className="text-sm text-gray-500">
            Set your meeting time and see what time it will be for your team members around the world
          </p>
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