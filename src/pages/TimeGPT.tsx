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
    return allZones.find(zone => 
      zone.label.toLowerCase().includes(location.toLowerCase())
    )?.value;
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
              content: `You are a time conversion assistant. Extract time conversion details from the query and respond ONLY with a JSON object containing these fields:
              {
                "sourceLocation": "location where the time is known",
                "sourceTime": "time in HH:mm format",
                "targetLocation": "location where we want to know the time"
              }
              Example: {"sourceLocation": "New York", "sourceTime": "14:30", "targetLocation": "London"}`
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
      console.log("Perplexity API response:", data);

      // Extract the content and parse it as JSON
      let extractedInfo;
      try {
        // The actual JSON response is in the message content
        extractedInfo = JSON.parse(data.choices[0].message.content);
        console.log("Parsed extracted info:", extractedInfo);
      } catch (error) {
        console.error("Error parsing API response:", error);
        throw new Error("Invalid response format from API");
      }

      // Find timezone identifiers
      const sourceTimezone = findTimeZone(extractedInfo.sourceLocation);
      const targetTimezone = findTimeZone(extractedInfo.targetLocation);

      if (!sourceTimezone || !targetTimezone) {
        throw new Error("Could not find timezone for one or both locations");
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

      console.log("Conversion result:", result);

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
              placeholder="Example: I have a meeting at Jordan time 9:30 AM, what time will it be in Geneva?"
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