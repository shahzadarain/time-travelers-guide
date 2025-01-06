import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { timeZones } from "@/data/timeZones";
import { cn } from "@/lib/utils";
import { AnalogClock } from "@/components/AnalogClock";
import { DigitalClock } from "@/components/DigitalClock";

export const WorldClock = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [isDigital, setIsDigital] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const selectedZone = timeZones
    .flatMap(continent => continent.zones)
    .find(zone => zone.value === selectedTimezone);

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">World Clock</h1>
          <div className="space-x-4">
            <Button
              variant={isDigital ? "default" : "outline"}
              onClick={() => setIsDigital(true)}
            >
              Digital
            </Button>
            <Button
              variant={!isDigital ? "default" : "outline"}
              onClick={() => setIsDigital(false)}
            >
              Analog
            </Button>
          </div>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">Current Time</h2>
                {selectedZone && (
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{selectedZone.flag}</span>
                    <span>{selectedZone.label}</span>
                  </p>
                )}
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-between">
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
                <PopoverContent className="w-[400px] p-0">
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
                                onSelect={() => {
                                  setSelectedTimezone(zone.value);
                                  setOpen(false);
                                }}
                              >
                                <span className="flex items-center gap-2">
                                  <span>{zone.flag}</span>
                                  <span>{zone.label}</span>
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

            <div className="flex justify-center items-center min-h-[400px]">
              {isDigital ? (
                <DigitalClock timezone={selectedTimezone} currentTime={currentTime} />
              ) : (
                <AnalogClock timezone={selectedTimezone} currentTime={currentTime} />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorldClock;