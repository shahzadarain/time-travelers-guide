import { useState } from "react";
import { TimeZoneCard } from "@/components/TimeZoneCard";
import { AddTimeZoneButton } from "@/components/AddTimeZoneButton";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [targetTimeZones, setTargetTimeZones] = useState([1]);
  const { toast } = useToast();

  const handleAddTimeZone = () => {
    if (targetTimeZones.length >= 4) {
      toast({
        title: "Maximum time zones reached",
        description: "You can only add up to 4 target time zones.",
        variant: "destructive",
      });
      return;
    }
    setTargetTimeZones([...targetTimeZones, targetTimeZones.length + 1]);
  };

  const handleTimeZoneChange = (timezone: string) => {
    console.log("Time zone changed:", timezone);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Time Zone Navigator</h1>
          <p className="text-lg text-gray-600">
            Convert times across different time zones easily
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <TimeZoneCard isSource onTimeZoneChange={handleTimeZoneChange} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {targetTimeZones.map((id) => (
            <TimeZoneCard key={id} onTimeZoneChange={handleTimeZoneChange} />
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