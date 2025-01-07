import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { useToast } from "@/hooks/use-toast";
import { TimeConversionForm } from "@/components/TimeConversionForm";
import { TimeConversionResult } from "@/components/TimeConversionResult";
import { makePerplexityRequest } from "@/utils/perplexityApi";

interface AIResponse {
  response: string;
}

const TimeGPT = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a query.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    console.log("Starting AI query:", query);

    try {
      const response = await makePerplexityRequest(query);
      console.log("AI Response:", response);
      setResult(response as AIResponse);
    } catch (error) {
      console.error("Error during AI request:", error);
      toast({
        title: "Request Error",
        description: error instanceof Error ? error.message : "Failed to process your query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2C1A2F]">
      <MainNav />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold text-white">TimeGPT</h1>
            <p className="text-[#aaadb0]">Powered by Mistral</p>
          </div>
          
          <div className="space-y-6 bg-black/20 p-6 rounded-lg backdrop-blur-sm border border-white/10 animate-fade-in">
            <TimeConversionForm
              query={query}
              isLoading={isLoading}
              onQueryChange={setQuery}
              onSubmit={handleSubmit}
            />

            {result && (
              <div className="mt-6 animate-fade-in">
                <TimeConversionResult result={result} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeGPT;