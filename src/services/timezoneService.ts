import { timeZones } from "@/data/timeZones";
import { cityAliases } from "@/data/cityAliases";
import { formatInTimeZone } from "date-fns-tz";

export const findTimeZone = (location: string) => {
  const normalizedLocation = location.toLowerCase().trim();
  
  console.log(`Searching for timezone for location: ${location}`);
  
  // First check if we have a direct alias match
  if (cityAliases[normalizedLocation]) {
    console.log(`Found timezone through alias: ${cityAliases[normalizedLocation]}`);
    return cityAliases[normalizedLocation];
  }

  // Check if any part of the location matches an alias
  const locationParts = normalizedLocation.split(/[,-\s]+/);
  for (const part of locationParts) {
    if (cityAliases[part]) {
      console.log(`Found timezone through partial alias match: ${cityAliases[part]}`);
      return cityAliases[part];
    }
  }

  // If no alias found, search through timezone database
  const allZones = timeZones.flatMap(continent => continent.zones);
  
  // Try exact match first
  let match = allZones.find(zone => 
    zone.label.toLowerCase().includes(normalizedLocation)
  );

  if (!match) {
    // Try matching any part of the location against zone labels
    match = allZones.find(zone => 
      locationParts.some(part => 
        zone.label.toLowerCase().includes(part.trim())
      )
    );
  }

  if (!match) {
    // Try matching against continent/region names
    const continent = timeZones.find(cont => 
      locationParts.some(part => 
        cont.continent.toLowerCase().includes(part.trim())
      )
    );
    
    if (continent && continent.zones.length > 0) {
      // Use the first timezone in the matched continent as a fallback
      match = continent.zones[0];
      console.log(`Found continent match, using first timezone:`, match);
    }
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