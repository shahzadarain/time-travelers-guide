import { supabase } from "@/integrations/supabase/client";

export const makePerplexityRequest = async (query: string, apiKey: string) => {
  console.log("Making Perplexity API request for query:", query);
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("No session found");
    }

    // Make the request to our Edge Function
    const { data, error } = await supabase.functions.invoke('perplexity', {
      body: { query }
    });

    if (error) {
      console.error("Edge Function Error:", error);
      throw error;
    }

    console.log("API Response:", data);
    
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid API response format:", data);
      throw new Error("Invalid response format from API");
    }

    return data;
  } catch (error) {
    console.error("Error in makePerplexityRequest:", error);
    throw error;
  }
};