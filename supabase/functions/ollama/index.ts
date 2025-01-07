import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OLLAMA_API_URL = "https://baf0d22de77b.ngrok.app/api";

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
    // First, let's check what models are available
    const modelsResponse = await fetch(`${OLLAMA_API_URL}/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!modelsResponse.ok) {
      console.error("Failed to fetch models:", await modelsResponse.text());
      throw new Error("Failed to fetch available models");
    }

    const models = await modelsResponse.json();
    console.log("Available models:", models);

    const { query } = await req.json();
    console.log("Received query:", query);

    // Make request to Ollama API
    const response = await fetch(`${OLLAMA_API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2:latest',  // Using latest tag which is commonly available
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

    return new Response(JSON.stringify({ response: data.response }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});