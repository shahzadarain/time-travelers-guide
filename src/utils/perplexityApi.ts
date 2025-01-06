import { supabase } from "@/integrations/supabase/client";

export const makePerplexityRequest = async (query: string) => {
  console.log("Making Perplexity API request for query:", query);
  
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();
    
    // If there's no session, we should handle this gracefully
    if (!session) {
      console.log("No active session found - attempting anonymous access");
    }

    // Make the request to our Edge Function
    const { data, error } = await supabase.functions.invoke('perplexity', {
      body: { query },
      // Pass the session token if we have one
      headers: session ? {
        Authorization: `Bearer ${session.access_token}`
      } : {}
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