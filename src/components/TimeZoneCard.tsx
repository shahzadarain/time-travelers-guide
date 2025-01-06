import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface TimeZoneCardProps {
  isSource?: boolean;
  onTimeZoneChange?: (timezone: string) => void;
}

export const TimeZoneCard = ({ isSource = false, onTimeZoneChange }: TimeZoneCardProps) => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleTimezoneChange = (value: string) => {
    setSelectedTimezone(value);
    onTimeZoneChange?.(value);
  };

  const timeZones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    // Americas
    { value: "America/New_York", label: "United States - New York (EST/EDT)" },
    { value: "America/Chicago", label: "United States - Chicago (CST/CDT)" },
    { value: "America/Denver", label: "United States - Denver (MST/MDT)" },
    { value: "America/Los_Angeles", label: "United States - Los Angeles (PST/PDT)" },
    { value: "America/Toronto", label: "Canada - Toronto (EST/EDT)" },
    { value: "America/Vancouver", label: "Canada - Vancouver (PST/PDT)" },
    { value: "America/Mexico_City", label: "Mexico - Mexico City (CST/CDT)" },
    { value: "America/Bogota", label: "Colombia - Bogota (COT)" },
    { value: "America/Lima", label: "Peru - Lima (PET)" },
    { value: "America/Santiago", label: "Chile - Santiago (CLT/CLST)" },
    { value: "America/Sao_Paulo", label: "Brazil - São Paulo (BRT)" },
    { value: "America/Buenos_Aires", label: "Argentina - Buenos Aires (ART)" },
    { value: "America/Caracas", label: "Venezuela - Caracas (VET)" },
    // Europe
    { value: "Europe/London", label: "United Kingdom - London (GMT/BST)" },
    { value: "Europe/Paris", label: "France - Paris (CET/CEST)" },
    { value: "Europe/Berlin", label: "Germany - Berlin (CET/CEST)" },
    { value: "Europe/Rome", label: "Italy - Rome (CET/CEST)" },
    { value: "Europe/Madrid", label: "Spain - Madrid (CET/CEST)" },
    { value: "Europe/Amsterdam", label: "Netherlands - Amsterdam (CET/CEST)" },
    { value: "Europe/Brussels", label: "Belgium - Brussels (CET/CEST)" },
    { value: "Europe/Vienna", label: "Austria - Vienna (CET/CEST)" },
    { value: "Europe/Moscow", label: "Russia - Moscow (MSK)" },
    { value: "Europe/Stockholm", label: "Sweden - Stockholm (CET/CEST)" },
    { value: "Europe/Oslo", label: "Norway - Oslo (CET/CEST)" },
    { value: "Europe/Copenhagen", label: "Denmark - Copenhagen (CET/CEST)" },
    { value: "Europe/Dublin", label: "Ireland - Dublin (GMT/IST)" },
    { value: "Europe/Warsaw", label: "Poland - Warsaw (CET/CEST)" },
    { value: "Europe/Zurich", label: "Switzerland - Zurich (CET/CEST)" },
    // Asia
    { value: "Asia/Tokyo", label: "Japan - Tokyo (JST)" },
    { value: "Asia/Shanghai", label: "China - Shanghai (CST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Asia/Dubai", label: "UAE - Dubai (GST)" },
    { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
    { value: "Asia/Seoul", label: "South Korea - Seoul (KST)" },
    { value: "Asia/Kolkata", label: "India - Mumbai/Kolkata (IST)" },
    { value: "Asia/Bangkok", label: "Thailand - Bangkok (ICT)" },
    { value: "Asia/Jakarta", label: "Indonesia - Jakarta (WIB)" },
    { value: "Asia/Manila", label: "Philippines - Manila (PHT)" },
    { value: "Asia/Kuala_Lumpur", label: "Malaysia - Kuala Lumpur (MYT)" },
    { value: "Asia/Tel_Aviv", label: "Israel - Tel Aviv (IST)" },
    { value: "Asia/Riyadh", label: "Saudi Arabia - Riyadh (AST)" },
    { value: "Asia/Istanbul", label: "Turkey - Istanbul (TRT)" },
    // Oceania
    { value: "Australia/Sydney", label: "Australia - Sydney (AEST/AEDT)" },
    { value: "Australia/Melbourne", label: "Australia - Melbourne (AEST/AEDT)" },
    { value: "Australia/Perth", label: "Australia - Perth (AWST)" },
    { value: "Australia/Brisbane", label: "Australia - Brisbane (AEST)" },
    { value: "Pacific/Auckland", label: "New Zealand - Auckland (NZST/NZDT)" },
    { value: "Pacific/Fiji", label: "Fiji (FJT)" },
    // Africa
    { value: "Africa/Cairo", label: "Egypt - Cairo (EET)" },
    { value: "Africa/Johannesburg", label: "South Africa - Johannesburg (SAST)" },
    { value: "Africa/Lagos", label: "Nigeria - Lagos (WAT)" },
    { value: "Africa/Nairobi", label: "Kenya - Nairobi (EAT)" },
    { value: "Africa/Casablanca", label: "Morocco - Casablanca (WET/WEST)" },
    { value: "Africa/Accra", label: "Ghana - Accra (GMT)" },
    { value: "Africa/Addis_Ababa", label: "Ethiopia - Addis Ababa (EAT)" },
    { value: "Africa/Dar_es_Salaam", label: "Tanzania - Dar es Salaam (EAT)" },
  ];

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
          <Select onValueChange={handleTimezoneChange} defaultValue={selectedTimezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select time zone" />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
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