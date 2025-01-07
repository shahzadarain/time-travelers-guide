import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OLLAMA_API_URL = "https://baf0d22de77b.ngrok.app/api/generate";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Enable CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const { query } = await req.json();
    console.log("Received query:", query);

    // Make request to Ollama API
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',  // Changed from llama3.2 to llama2
        prompt: query,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama API error:", response.status, "-", errorText);
      throw new Error(`Ollama API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Format the response to match the expected AIResponse type
    return new Response(JSON.stringify({ response: data.response }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});