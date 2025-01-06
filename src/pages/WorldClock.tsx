import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { timeZones } from "@/data/timeZones";
import { cn } from "@/lib/utils";
import { DigitalClock } from "@/components/DigitalClock";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TimeZoneCard {
  id: number;
  timezone: string;
}

export const WorldClock = () => {
  const [timeZoneCards, setTimeZoneCards] = useState<TimeZoneCard[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>({});
  const [use24Hour, setUse24Hour] = useState(() => {
    const saved = localStorage.getItem('timeFormat');
    return saved ? saved === '24h' : true;
  });
  const { toast } = useToast();

  // Load saved timezones from localStorage
  useEffect(() => {
    const savedTimeZones = localStorage.getItem('timeZones');
    if (savedTimeZones) {
      setTimeZoneCards(JSON.parse(savedTimeZones));
    } else {
      setTimeZoneCards([{ id: 1, timezone: "UTC" }]);
    }
  }, []);

  // Save timezones to localStorage whenever they change
  useEffect(() => {
    if (timeZoneCards.length > 0) {
      localStorage.setItem('timeZones', JSON.stringify(timeZoneCards));
    }
  }, [timeZoneCards]);

  // Save time format preference
  useEffect(() => {
    localStorage.setItem('timeFormat', use24Hour ? '24h' : '12h');
  }, [use24Hour]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTimeZone = () => {
    const newId = Math.max(...timeZoneCards.map(card => card.id), 0) + 1;
    setTimeZoneCards([...timeZoneCards, { id: newId, timezone: "UTC" }]);
    toast({
      title: "Time Zone Added",
      description: "New time zone card has been added.",
    });
  };

  const handleRemoveTimeZone = (id: number) => {
    if (timeZoneCards.length > 1) {
      setTimeZoneCards(timeZoneCards.filter(card => card.id !== id));
      toast({
        title: "Time Zone Removed",
        description: "Time zone card has been removed.",
      });
    }
  };

  const handleTimezoneChange = (id: number, newTimezone: string) => {
    setTimeZoneCards(timeZoneCards.map(card => 
      card.id === id ? { ...card, timezone: newTimezone } : card
    ));
    setOpenPopovers({ ...openPopovers, [id]: false });
    toast({
      title: "Time Zone Updated",
      description: "Time zone has been changed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-primary">World Clock</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="time-format"
                checked={use24Hour}
                onCheckedChange={setUse24Hour}
              />
              <Label htmlFor="time-format">24-hour format</Label>
            </div>
            <Button 
              onClick={handleAddTimeZone} 
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Time Zone
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeZoneCards.map((card) => {
            const selectedZone = timeZones
              .flatMap(continent => continent.zones)
              .find(zone => zone.value === card.timezone);

            return (
              <Card 
                key={card.id} 
                className="p-6 relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {timeZoneCards.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    onClick={() => handleRemoveTimeZone(card.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                    <Popover 
                      open={openPopovers[card.id]} 
                      onOpenChange={(open) => setOpenPopovers({ ...openPopovers, [card.id]: open })}
                    >
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-between bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        >
                          {selectedZone ? (
                            <span className="flex items-center gap-2">
                              <span>{selectedZone.flag}</span>
                              <span className="truncate">{selectedZone.label}</span>
                            </span>
                          ) : (
                            "Select timezone..."
                          )}
                          <Globe className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search timezone..." />
                          <CommandList>
                            <CommandEmpty>No timezone found.</CommandEmpty>
                            <div className="max-h-[300px] overflow-y-auto">
                              {timeZones.map((continent) => (
                                <CommandGroup key={continent.continent} heading={continent.continent}>
                                  {continent.zones.map((zone) => (
                                    <CommandItem
                                      key={zone.value}
                                      value={zone.label}
                                      onSelect={() => handleTimezoneChange(card.id, zone.value)}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span>{zone.flag}</span>
                                      <span>{zone.label}</span>
                                      <span
                                        className={cn(
                                          "ml-auto",
                                          card.timezone === zone.value ? "opacity-100" : "opacity-0"
                                        )}
                                      >
                                        ✓
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              ))}
                            </div>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex justify-center items-center h-[120px] bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <DigitalClock timezone={card.timezone} currentTime={currentTime} hour12={!use24Hour} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldClock;