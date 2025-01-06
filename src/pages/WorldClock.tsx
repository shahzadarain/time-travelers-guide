import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Plus, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { timeZones } from "@/data/timeZones";
import { cn } from "@/lib/utils";
import { DigitalClock } from "@/components/DigitalClock";

interface TimeZoneCard {
  id: number;
  timezone: string;
}

export const WorldClock = () => {
  const [timeZoneCards, setTimeZoneCards] = useState<TimeZoneCard[]>([{ id: 1, timezone: "UTC" }]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTimeZone = () => {
    const newId = Math.max(...timeZoneCards.map(card => card.id), 0) + 1;
    setTimeZoneCards([...timeZoneCards, { id: newId, timezone: "UTC" }]);
  };

  const handleRemoveTimeZone = (id: number) => {
    if (timeZoneCards.length > 1) {
      setTimeZoneCards(timeZoneCards.filter(card => card.id !== id));
    }
  };

  const handleTimezoneChange = (id: number, newTimezone: string) => {
    setTimeZoneCards(timeZoneCards.map(card => 
      card.id === id ? { ...card, timezone: newTimezone } : card
    ));
    setOpenPopovers({ ...openPopovers, [id]: false });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">World Clock</h1>
          <Button onClick={handleAddTimeZone} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Time Zone
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timeZoneCards.map((card) => {
            const selectedZone = timeZones
              .flatMap(continent => continent.zones)
              .find(zone => zone.value === card.timezone);

            return (
              <Card key={card.id} className="p-6 relative">
                {timeZoneCards.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveTimeZone(card.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Location</label>
                    <Popover 
                      open={openPopovers[card.id]} 
                      onOpenChange={(open) => setOpenPopovers({ ...openPopovers, [card.id]: open })}
                    >
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
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
                      <PopoverContent className="w-[400px] p-0" align="start">
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
                                    >
                                      <span className="flex items-center gap-2">
                                        <span>{zone.flag}</span>
                                        <span>{zone.label}</span>
                                      </span>
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

                  <div className="flex justify-center items-center h-[200px]">
                    <DigitalClock timezone={card.timezone} currentTime={currentTime} />
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