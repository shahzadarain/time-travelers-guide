import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const OLLAMA_API_URL = Deno.env.get('OLLAMA_API_URL');
    console.log('Using OLLAMA_API_URL:', OLLAMA_API_URL);
    
    if (!OLLAMA_API_URL) {
      throw new Error('OLLAMA_API_URL is not set');
    }

    const { query } = await req.json();
    console.log("Processing query:", query);

    // Construct the full URL and log it for debugging
    const apiUrl = `${OLLAMA_API_URL}/api/generate`;
    console.log("Making request to:", apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        prompt: `You are a time conversion assistant. Extract time and location information from this query and respond with ONLY a JSON object in this EXACT format, with NO additional text: {"sourceLocation":"LOCATION","sourceTime":"HH:mm","targetLocation":"LOCATION"}. Use only city or country names without extra words. Query: ${query}`,
        stream: false,
      }),
    });

    // Log the response status and status text
    console.log("Ollama API response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: apiUrl
      });
      throw new Error(`Ollama API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Ollama API Response data:", data);

    // Format the response to match the expected structure
    const formattedResponse = {
      choices: [{
        message: {
          content: data.response
        }
      }]
    };

    return new Response(JSON.stringify(formattedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });

    // Return a proper error response with CORS headers
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});