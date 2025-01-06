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
    { value: "America/New_York", label: "New York (EST/EDT)" },
    { value: "America/Chicago", label: "Chicago (CST/CDT)" },
    { value: "America/Denver", label: "Denver (MST/MDT)" },
    { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
    { value: "America/Toronto", label: "Toronto (EST/EDT)" },
    { value: "America/Vancouver", label: "Vancouver (PST/PDT)" },
    { value: "America/Mexico_City", label: "Mexico City (CST/CDT)" },
    { value: "America/Sao_Paulo", label: "São Paulo (BRT)" },
    { value: "America/Buenos_Aires", label: "Buenos Aires (ART)" },
    // Europe
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)" },
    { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
    { value: "Europe/Rome", label: "Rome (CET/CEST)" },
    { value: "Europe/Madrid", label: "Madrid (CET/CEST)" },
    { value: "Europe/Moscow", label: "Moscow (MSK)" },
    // Asia
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
    { value: "Asia/Seoul", label: "Seoul (KST)" },
    { value: "Asia/Kolkata", label: "Mumbai/Kolkata (IST)" },
    // Oceania
    { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
    { value: "Australia/Melbourne", label: "Melbourne (AEST/AEDT)" },
    { value: "Australia/Perth", label: "Perth (AWST)" },
    { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
    // Africa
    { value: "Africa/Cairo", label: "Cairo (EET)" },
    { value: "Africa/Johannesburg", label: "Johannesburg (SAST)" },
    { value: "Africa/Lagos", label: "Lagos (WAT)" },
    { value: "Africa/Nairobi", label: "Nairobi (EAT)" },
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