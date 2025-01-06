import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

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

  const timeZones = [
    {
      continent: "UTC",
      zones: [
        { value: "UTC", label: "UTC (Coordinated Universal Time)", flag: "🌐" }
      ]
    },
    {
      continent: "Americas",
      zones: [
        { value: "America/New_York", label: "United States - New York (EST/EDT)", flag: "🇺🇸" },
        { value: "America/Chicago", label: "United States - Chicago (CST/CDT)", flag: "🇺🇸" },
        { value: "America/Denver", label: "United States - Denver (MST/MDT)", flag: "🇺🇸" },
        { value: "America/Los_Angeles", label: "United States - Los Angeles (PST/PDT)", flag: "🇺🇸" },
        { value: "America/Toronto", label: "Canada - Toronto (EST/EDT)", flag: "🇨🇦" },
        { value: "America/Vancouver", label: "Canada - Vancouver (PST/PDT)", flag: "🇨🇦" },
        { value: "America/Mexico_City", label: "Mexico - Mexico City (CST/CDT)", flag: "🇲🇽" },
        { value: "America/Bogota", label: "Colombia - Bogota (COT)", flag: "🇨🇴" },
        { value: "America/Lima", label: "Peru - Lima (PET)", flag: "🇵🇪" },
        { value: "America/Santiago", label: "Chile - Santiago (CLT/CLST)", flag: "🇨🇱" },
        { value: "America/Sao_Paulo", label: "Brazil - São Paulo (BRT)", flag: "🇧🇷" },
        { value: "America/Buenos_Aires", label: "Argentina - Buenos Aires (ART)", flag: "🇦🇷" },
        { value: "America/Caracas", label: "Venezuela - Caracas (VET)", flag: "🇻🇪" }
      ]
    },
    {
      continent: "Europe",
      zones: [
        { value: "Europe/London", label: "United Kingdom - London (GMT/BST)", flag: "🇬🇧" },
        { value: "Europe/Paris", label: "France - Paris (CET/CEST)", flag: "🇫🇷" },
        { value: "Europe/Berlin", label: "Germany - Berlin (CET/CEST)", flag: "🇩🇪" },
        { value: "Europe/Rome", label: "Italy - Rome (CET/CEST)", flag: "🇮🇹" },
        { value: "Europe/Madrid", label: "Spain - Madrid (CET/CEST)", flag: "🇪🇸" },
        { value: "Europe/Amsterdam", label: "Netherlands - Amsterdam (CET/CEST)", flag: "🇳🇱" },
        { value: "Europe/Brussels", label: "Belgium - Brussels (CET/CEST)", flag: "🇧🇪" },
        { value: "Europe/Vienna", label: "Austria - Vienna (CET/CEST)", flag: "🇦🇹" },
        { value: "Europe/Moscow", label: "Russia - Moscow (MSK)", flag: "🇷🇺" },
        { value: "Europe/Stockholm", label: "Sweden - Stockholm (CET/CEST)", flag: "🇸🇪" },
        { value: "Europe/Oslo", label: "Norway - Oslo (CET/CEST)", flag: "🇳🇴" },
        { value: "Europe/Copenhagen", label: "Denmark - Copenhagen (CET/CEST)", flag: "🇩🇰" },
        { value: "Europe/Dublin", label: "Ireland - Dublin (GMT/IST)", flag: "🇮🇪" },
        { value: "Europe/Warsaw", label: "Poland - Warsaw (CET/CEST)", flag: "🇵🇱" },
        { value: "Europe/Zurich", label: "Switzerland - Zurich (CET/CEST)", flag: "🇨🇭" }
      ]
    },
    {
      continent: "Asia",
      zones: [
        { value: "Asia/Tokyo", label: "Japan - Tokyo (JST)", flag: "🇯🇵" },
        { value: "Asia/Shanghai", label: "China - Shanghai (CST)", flag: "🇨🇳" },
        { value: "Asia/Singapore", label: "Singapore (SGT)", flag: "🇸🇬" },
        { value: "Asia/Dubai", label: "UAE - Dubai (GST)", flag: "🇦🇪" },
        { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", flag: "🇭🇰" },
        { value: "Asia/Seoul", label: "South Korea - Seoul (KST)", flag: "🇰🇷" },
        { value: "Asia/Kolkata", label: "India - Mumbai/Kolkata (IST)", flag: "🇮🇳" },
        { value: "Asia/Bangkok", label: "Thailand - Bangkok (ICT)", flag: "🇹🇭" },
        { value: "Asia/Jakarta", label: "Indonesia - Jakarta (WIB)", flag: "🇮🇩" },
        { value: "Asia/Manila", label: "Philippines - Manila (PHT)", flag: "🇵🇭" },
        { value: "Asia/Kuala_Lumpur", label: "Malaysia - Kuala Lumpur (MYT)", flag: "🇲🇾" },
        { value: "Asia/Tel_Aviv", label: "Israel - Tel Aviv (IST)", flag: "🇮🇱" },
        { value: "Asia/Riyadh", label: "Saudi Arabia - Riyadh (AST)", flag: "🇸🇦" },
        { value: "Asia/Istanbul", label: "Turkey - Istanbul (TRT)", flag: "🇹🇷" }
      ]
    },
    {
      continent: "Oceania",
      zones: [
        { value: "Australia/Sydney", label: "Australia - Sydney (AEST/AEDT)", flag: "🇦🇺" },
        { value: "Australia/Melbourne", label: "Australia - Melbourne (AEST/AEDT)", flag: "🇦🇺" },
        { value: "Australia/Perth", label: "Australia - Perth (AWST)", flag: "🇦🇺" },
        { value: "Australia/Brisbane", label: "Australia - Brisbane (AEST)", flag: "🇦🇺" },
        { value: "Pacific/Auckland", label: "New Zealand - Auckland (NZST/NZDT)", flag: "🇳🇿" },
        { value: "Pacific/Fiji", label: "Fiji (FJT)", flag: "🇫🇯" }
      ]
    },
    {
      continent: "Africa",
      zones: [
        { value: "Africa/Cairo", label: "Egypt - Cairo (EET)", flag: "🇪🇬" },
        { value: "Africa/Johannesburg", label: "South Africa - Johannesburg (SAST)", flag: "🇿🇦" },
        { value: "Africa/Lagos", label: "Nigeria - Lagos (WAT)", flag: "🇳🇬" },
        { value: "Africa/Nairobi", label: "Kenya - Nairobi (EAT)", flag: "🇰🇪" },
        { value: "Africa/Casablanca", label: "Morocco - Casablanca (WET/WEST)", flag: "🇲🇦" },
        { value: "Africa/Accra", label: "Ghana - Accra (GMT)", flag: "🇬🇭" },
        { value: "Africa/Addis_Ababa", label: "Ethiopia - Addis Ababa (EAT)", flag: "🇪🇹" },
        { value: "Africa/Dar_es_Salaam", label: "Tanzania - Dar es Salaam (EAT)", flag: "🇹🇿" }
      ]
    }
  ];

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
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search time zone..." />
                <CommandEmpty>No time zone found.</CommandEmpty>
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