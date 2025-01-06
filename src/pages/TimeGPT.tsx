import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { useToast } from "@/hooks/use-toast";
import { TimeConversionForm } from "@/components/TimeConversionForm";
import { TimeConversionResult } from "@/components/TimeConversionResult";
import { makePerplexityRequest } from "@/utils/perplexityApi";
import { findTimeZone, convertTime, createTimeFromString } from "@/services/timezoneService";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

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
    console.log("Starting time conversion for query:", query);

    try {
      const { data, error } = await supabase
        .from('secrets')
        .select('value')
        .eq('name', 'PERPLEXITY_API_KEY')
        .single();

      if (error || !data) {
        throw new Error("Could not retrieve API key from Supabase");
      }

      const apiKey = data.value;
      const perplexityResponse = await makePerplexityRequest(query, apiKey);
      console.log("API response:", perplexityResponse);

      const content = perplexityResponse.choices[0].message.content.trim();
      console.log("Raw content:", content);

      const jsonStr = content.replace(/\n/g, '').trim();
      console.log("Cleaned JSON string:", jsonStr);

      const extractedInfo = JSON.parse(jsonStr);
      console.log("Parsed info:", extractedInfo);

      if (!extractedInfo.sourceLocation || !extractedInfo.sourceTime || !extractedInfo.targetLocation) {
        throw new Error("Missing required fields in response");
      }

      const sourceTimezone = findTimeZone(extractedInfo.sourceLocation);
      const targetTimezone = findTimeZone(extractedInfo.targetLocation);

      if (!sourceTimezone || !targetTimezone) {
        throw new Error(`Could not find timezone for ${!sourceTimezone ? extractedInfo.sourceLocation : extractedInfo.targetLocation}`);
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
    <div className="container mx-auto p-4">
      <MainNav />
      <div className="max-w-2xl mx-auto mt-8 space-y-6">
        <h1 className="text-3xl font-bold">TimeGPT</h1>
        
        <TimeConversionForm
          query={query}
          isLoading={isLoading}
          onQueryChange={setQuery}
          onSubmit={handleConversion}
        />

        <TimeConversionResult result={result} />
      </div>
    </div>
  );
};

export default TimeGPT;