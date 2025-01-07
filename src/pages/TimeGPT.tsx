import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { useToast } from "@/hooks/use-toast";
import { TimeConversionForm } from "@/components/TimeConversionForm";
import { TimeConversionResult } from "@/components/TimeConversionResult";
import { makePerplexityRequest } from "@/utils/perplexityApi";
import { findTimeZone, convertTime, createTimeFromString } from "@/services/timezoneService";
import { format } from "date-fns";

interface TimeConversion {
  sourceLocation: string;
  sourceTime: string;
  targetLocation: string;
  convertedTime: string;
}

const TimeGPT = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TimeConversion | null>(null);
  const { toast } = useToast();

  const handleConversion = async () => {
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a time conversion query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    console.log("Starting time conversion for query:", query);

    try {
      // Make the API request
      const perplexityResponse = await makePerplexityRequest(query);
      
      if (!perplexityResponse.choices?.[0]?.message?.content) {
        throw new Error("Invalid API response format");
      }

      const content = perplexityResponse.choices[0].message.content.trim();
      console.log("Raw content:", content);

      // Parse the JSON response
      let extractedInfo;
      try {
        extractedInfo = JSON.parse(content);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Failed to parse API response");
      }

      if (!extractedInfo.sourceLocation || !extractedInfo.sourceTime || !extractedInfo.targetLocation) {
        console.error("Missing fields in response:", extractedInfo);
        throw new Error("Missing required fields in response");
      }

      // Convert the times
      const sourceTimezone = findTimeZone(extractedInfo.sourceLocation);
      const targetTimezone = findTimeZone(extractedInfo.targetLocation);

      if (!sourceTimezone || !targetTimezone) {
        throw new Error(
          `Could not find timezone for ${!sourceTimezone ? extractedInfo.sourceLocation : extractedInfo.targetLocation}`
        );
      }

      const sourceDate = createTimeFromString(extractedInfo.sourceTime);
      const convertedTime = convertTime(sourceDate, targetTimezone);

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
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mt-8 space-y-6">
          <h1 className="text-3xl font-bold text-primary">TimeGPT</h1>
          
          <TimeConversionForm
            query={query}
            isLoading={isLoading}
            onQueryChange={setQuery}
            onSubmit={handleConversion}
          />

          <TimeConversionResult result={result} />
        </div>
      </div>
    </div>
  );
};

export default TimeGPT;
