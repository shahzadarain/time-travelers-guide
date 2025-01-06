import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { timeZones } from "@/data/timeZones";

interface TimeZoneCardProps {
  isSource?: boolean;
  onTimeZoneChange?: (timezone: string) => void;
  onTimeChange?: (time: string) => void;
  sourceTime?: string;
  sourceTimezone?: string;
}

export const TimeZoneCard = ({ 
  isSource = false, 
  onTimeZoneChange, 
  onTimeChange,
  sourceTime,
  sourceTimezone 
}: TimeZoneCardProps) => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    onTimeChange?.(e.target.value);
  };

  const getConvertedTime = () => {
    if (!isSource && sourceTime && sourceTimezone) {
      const [hours, minutes] = sourceTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      
      return date.toLocaleTimeString(undefined, {
        timeZone: selectedTimezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    return selectedTime;
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString(undefined, {
      timeZone: selectedTimezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
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
                <CommandInput placeholder="Search by country or city..." />
                <CommandList>
                  <CommandEmpty>No time zone found.</CommandEmpty>
                  <div className="max-h-[300px] overflow-y-auto">
                    {timeZones.map((continent) => (
                      <CommandGroup key={continent.continent} heading={continent.continent}>
                        {continent.zones.map((zone) => (
                          <CommandItem
                            key={zone.value}
                            value={zone.label}
                            onSelect={() => handleTimezoneChange(zone.value)}
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
          
          <div className="space-y-4">
            {/* Current Time Display */}
            <div className="flex items-center space-x-2 p-3 rounded-md bg-secondary/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Current:</span>
              <span className="text-lg font-semibold text-primary">
                {getCurrentTime()}
              </span>
            </div>

            {/* Selected/Converted Time Display */}
            <div className="flex items-center space-x-2 p-3 rounded-md bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
              {isSource ? (
                <>
                  <span className="text-sm font-medium text-muted-foreground">Selected:</span>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="w-32"
                  />
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-muted-foreground">Converted:</span>
                  <span className="text-2xl font-bold text-primary">
                    {getConvertedTime()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};