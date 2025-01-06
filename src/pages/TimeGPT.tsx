import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { timeZones } from "@/data/timeZones";

interface TimeConversion {
  sourceLocation: string;
  sourceTime: string;
  targetLocation: string;
  convertedTime: string;
}

const TimeGPT = () => {
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TimeConversion | null>(null);
  const { toast } = useToast();

  const findTimeZone = (location: string) => {
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

  const handleConversion = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to use this feature.",
        variant: "destructive",
      });
      return;
    }

    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a time conversion query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Starting time conversion for query:", query);

    try {
      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content: `You are a time conversion assistant. Extract time and location information from the query and respond with ONLY a JSON object in this EXACT format, with NO additional text or explanation:
{"sourceLocation":"LOCATION","sourceTime":"HH:mm","targetLocation":"LOCATION"}
Use only city or country names without extra words. For example: "Paris", "Tokyo", "United States", etc.`
            },
            {
              role: "user",
              content: query,
            },
          ],
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process query");
      }

      const data = await response.json();
      console.log("API response:", data);

      const content = data.choices[0].message.content.trim();
      console.log("Raw content:", content);

      // Ensure we're working with a clean JSON string
      const jsonStr = content.replace(/\n/g, '').trim();
      console.log("Cleaned JSON string:", jsonStr);

      const extractedInfo = JSON.parse(jsonStr);
      console.log("Parsed info:", extractedInfo);

      if (!extractedInfo.sourceLocation || !extractedInfo.sourceTime || !extractedInfo.targetLocation) {
        throw new Error("Missing required fields in response");
      }

      // Find timezone identifiers
      const sourceTimezone = findTimeZone(extractedInfo.sourceLocation);
      const targetTimezone = findTimeZone(extractedInfo.targetLocation);

      if (!sourceTimezone || !targetTimezone) {
        console.error("Timezone lookup failed:", {
          sourceLocation: extractedInfo.sourceLocation,
          sourceTimezone,
          targetLocation: extractedInfo.targetLocation,
          targetTimezone
        });
        throw new Error(`Could not find timezone for ${!sourceTimezone ? extractedInfo.sourceLocation : extractedInfo.targetLocation}`);
      }

      // Parse the time and create a Date object for today
      const [hours, minutes] = extractedInfo.sourceTime.split(":");
      const sourceDate = new Date();
      sourceDate.setHours(parseInt(hours, 10));
      sourceDate.setMinutes(parseInt(minutes, 10));

      // Convert time
      const convertedTime = formatInTimeZone(sourceDate, targetTimezone, "h:mm a");

      setResult({
        sourceLocation: extractedInfo.sourceLocation,
        sourceTime: format(sourceDate, "h:mm a"),
        targetLocation: extractedInfo.targetLocation,
        convertedTime,
      });

    } catch (error) {
      console.error("Error during conversion:", error);
      toast({
        title: "Conversion Error",
        description: error instanceof Error ? error.message : "Failed to process your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <MainNav />
      <div className="max-w-2xl mx-auto mt-8 space-y-6">
        <h1 className="text-3xl font-bold">TimeGPT</h1>
        
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your Perplexity API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full"
          />
          
          <div className="space-y-2">
            <Input
              placeholder="Example: What time is 3:00 PM in Paris when it's that time in Tokyo?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={handleConversion} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Converting..." : "Convert Time"}
            </Button>
          </div>

          {result && (
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-lg">
                {result.sourceTime} in {result.sourceLocation} is{" "}
                {result.convertedTime} in {result.targetLocation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeGPT;