import { useState, useEffect } from "react";
import { TimeZoneCard } from "@/components/TimeZoneCard";
import { AddTimeZoneButton } from "@/components/AddTimeZoneButton";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MainNav } from "@/components/MainNav";

const Index = () => {
  const { toast } = useToast();
  const [timeZoneCards, setTimeZoneCards] = useState(() => {
    try {
      const saved = localStorage.getItem("timeZoneCards");
      return saved ? JSON.parse(saved) : [{ id: 1, timezone: "UTC" }];
    } catch (error) {
      console.error("Error parsing timeZoneCards from localStorage:", error);
      return [{ id: 1, timezone: "UTC" }];
    }
  });

  const [hour12Format, setHour12Format] = useState(() => {
    try {
      const saved = localStorage.getItem("timeFormat");
      // Clear invalid data if it exists
      if (saved && (saved === "true" || saved === "false")) {
        return JSON.parse(saved);
      } else {
        localStorage.removeItem("timeFormat");
        return true; // Default value
      }
    } catch (error) {
      console.error("Error parsing timeFormat from localStorage:", error);
      localStorage.removeItem("timeFormat"); // Clear invalid data
      return true; // Default to 12-hour format on error
    }
  });

  // Save time format preference
  useEffect(() => {
    try {
      localStorage.setItem("timeFormat", JSON.stringify(hour12Format));
    } catch (error) {
      console.error("Error saving timeFormat to localStorage:", error);
    }
  }, [hour12Format]);

  // Save timezone cards
  useEffect(() => {
    try {
      localStorage.setItem("timeZoneCards", JSON.stringify(timeZoneCards));
    } catch (error) {
      console.error("Error saving timeZoneCards to localStorage:", error);
    }
  }, [timeZoneCards]);

  const handleAddTimeZone = () => {
    const newId = Math.max(...timeZoneCards.map(card => card.id), 0) + 1;
    setTimeZoneCards([...timeZoneCards, { id: newId, timezone: "UTC" }]);
    toast({ title: "Time Zone Added", description: "You can now select a new time zone." });
  };

  const handleRemoveTimeZone = (id: number) => {
    if (timeZoneCards.length > 1) {
      setTimeZoneCards(timeZoneCards.filter(card => card.id !== id));
      toast({ title: "Time Zone Removed", description: "You have removed a time zone." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Remote Team Meeting Planner</h1>
            <div className="flex items-center justify-center gap-8 mb-4">
              <AddTimeZoneButton onClick={handleAddTimeZone} />
              <div className="flex items-center space-x-2">
                <Switch
                  id="time-format"
                  checked={hour12Format}
                  onCheckedChange={setHour12Format}
                />
                <Label htmlFor="time-format">
                  {hour12Format ? '12-hour format' : '24-hour format'}
                </Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeZoneCards.map((card) => (
              <TimeZoneCard 
                key={card.id} 
                id={card.id}
                timezone={card.timezone}
                hour12={hour12Format}
                onRemove={() => handleRemoveTimeZone(card.id)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
