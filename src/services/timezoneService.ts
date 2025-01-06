import { timeZones } from "@/data/timeZones";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";

export const findTimeZone = (location: string) => {
  const allZones = timeZones.flatMap(continent => continent.zones);
  const normalizedLocation = location.toLowerCase();
  
  console.log(`Searching for timezone for location: ${location}`);
  
  // Try exact match first
  let match = allZones.find(zone => 
    zone.label.toLowerCase().includes(normalizedLocation)
  );

  if (!match) {
    // Try matching just the city/country name
    const locationParts = normalizedLocation.split(/[,-\s]+/);
    match = allZones.find(zone => 
      locationParts.some(part => 
        zone.label.toLowerCase().includes(part.trim())
      )
    );
  }

  if (match) {
    console.log(`Found timezone match:`, match);
    return match.value;
  }

  console.log(`No timezone found for location: ${location}`);
  return null;
};

export const convertTime = (sourceDate: Date, targetTimezone: string) => {
  return formatInTimeZone(sourceDate, targetTimezone, "h:mm a");
};

export const createTimeFromString = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date;
};