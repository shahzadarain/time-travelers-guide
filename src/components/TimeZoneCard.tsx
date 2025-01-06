import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { timeZones } from "@/data/timeZones";
import { CurrentTimeDisplay } from "./CurrentTimeDisplay";
import { MeetingTimeDisplay } from "./MeetingTimeDisplay";

interface TimeZoneCardProps {
  id?: number;  // Added id prop
  isSource?: boolean;
  onTimeZoneChange?: (timezone: string) => void;
  onTimeChange?: (time: string) => void;
  onRemove?: () => void;
  sourceTime?: string;
  sourceTimezone?: string;
}

export const TimeZoneCard = ({ 
  id,
  isSource = false, 
  onTimeZoneChange, 
  onTimeChange,
  onRemove,
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

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    onTimeChange?.(time);
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
    <Card className="w-full animate-fade-in relative time-zone-card">
      {!isSource && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
          aria-label="Remove time zone"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium location-text">
          {isSource ? "Meeting Time Zone" : "Team Member Time Zone"}
        </CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Select Location</label>
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
          </div>
          
          <div className="space-y-4">
            <CurrentTimeDisplay time={getCurrentTime()} />
            <MeetingTimeDisplay 
              isSource={isSource}
              time={getConvertedTime()}
              onTimeChange={handleTimeChange}
              className="time-text"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};