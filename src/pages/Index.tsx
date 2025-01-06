import { useState, useEffect } from "react";
import { TimeZoneCard } from "@/components/TimeZoneCard";
import { AddTimeZoneButton } from "@/components/AddTimeZoneButton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Share2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const { toast } = useToast();
  const [timeZoneCards, setTimeZoneCards] = useState([{ id: 1, timezone: "UTC" }]);
  const [hour12Format, setHour12Format] = useState(() => {
    const saved = localStorage.getItem("timeFormat");
    return saved ? JSON.parse(saved) : true;
  });

  // Save time format preference
  useEffect(() => {
    localStorage.setItem("timeFormat", JSON.stringify(hour12Format));
  }, [hour12Format]);

  // Save timezone cards
  useEffect(() => {
    localStorage.setItem("timeZoneCards", JSON.stringify(timeZoneCards));
  }, [timeZoneCards]);

  // Load saved timezone cards on mount
  useEffect(() => {
    const savedCards = localStorage.getItem("timeZoneCards");
    if (savedCards) {
      setTimeZoneCards(JSON.parse(savedCards));
    }
  }, []);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Time Zone Tools</h1>
          <div className="flex gap-4">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 font-medium"
            >
              Meeting Planner
            </Link>
            <Link 
              to="/world-clock" 
              className="px-4 py-2 rounded-md hover:bg-gray-100 font-medium flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              World Clock
            </Link>
          </div>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Remote Team Meeting Planner</h1>
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
  );
};

export default Index;