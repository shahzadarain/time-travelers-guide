import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { timeZones } from "@/data/timeZones";

interface TimeZoneCardProps {
  isSource?: boolean;
  onTimeZoneChange?: (timezone: string) => void;
}

export const TimeZoneCard = ({ isSource = false, onTimeZoneChange }: TimeZoneCardProps) => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimezoneChange = (value: string) => {
    setSelectedTimezone(value);
    setOpen(false);
    onTimeZoneChange?.(value);
  };

  const selectedZone = timeZones
    .flatMap(continent => continent.zones)
    .find(zone => zone.value === selectedTimezone);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {isSource ? "Source Time Zone" : "Target Time Zone"}
        </CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedZone ? (
                  <span className="flex items-center gap-2">
                    <span>{selectedZone.flag}</span>
                    <span className="truncate">{selectedZone.label}</span>
                  </span>
                ) : (
                  "Select time zone..."
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search time zone..." />
                <CommandList>
                  <CommandEmpty>No time zone found.</CommandEmpty>
                  <div className="max-h-[300px] overflow-y-auto">
                    {timeZones.map((continent) => (
                      <CommandGroup key={continent.continent} heading={continent.continent}>
                        {continent.zones.map((zone) => (
                          <CommandItem
                            key={zone.value}
                            value={zone.value}
                            onSelect={handleTimezoneChange}
                          >
                            <span className="flex items-center gap-2">
                              <span>{zone.flag}</span>
                              <span>{zone.label}</span>
                            </span>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedTimezone === zone.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                  </div>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-2xl font-bold">
              {currentTime.toLocaleTimeString(undefined, {
                timeZone: selectedTimezone,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};