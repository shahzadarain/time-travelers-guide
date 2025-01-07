import { supabase } from "@/integrations/supabase/client";

export const makePerplexityRequest = async (query: string) => {
  console.log("Making Ollama API request for query:", query);
  
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();
    
    // If there's no session, we should handle this gracefully
    if (!session) {
      console.log("No active session found - attempting anonymous access");
    }

    // Make the request to our Edge Function
    const { data, error } = await supabase.functions.invoke('ollama', {
      body: { 
        query: `You are a time conversion assistant. Extract time and location information from this query and respond with ONLY a JSON object in this EXACT format, with NO additional text: {"sourceLocation":"LOCATION","sourceTime":"HH:mm","targetLocation":"LOCATION"}. Use only city or country names without extra words. Query: ${query}` 
      },
      // Pass the session token if we have one
      headers: session ? {
        Authorization: `Bearer ${session.access_token}`
      } : {}
    });

    if (error) {
      console.error("Edge Function Error:", error);
      throw error;
    }

    if (!data || !data.response) {
      console.error("Invalid API response format:", data);
      throw new Error("Invalid response format from API");
    }

    console.log("API Response:", data);
    return {
      choices: [{
        message: {
          content: data.response
        }
      }]
    };
  } catch (error) {
    console.error("Error in makePerplexityRequest:", error);
    // Rethrow the error with more context
    throw new Error(`Failed to process time conversion: ${error.message}`);
  }
};