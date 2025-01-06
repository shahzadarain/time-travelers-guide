import { supabase } from "@/integrations/supabase/client";

export const makePerplexityRequest = async (query: string, apiKey: string) => {
  console.log("Making Perplexity API request for query:", query);
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("No session found");
    }

    const response = await fetch("https://cvqssrfmkgnbnkoqqtsj.supabase.co/functions/v1/perplexity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
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