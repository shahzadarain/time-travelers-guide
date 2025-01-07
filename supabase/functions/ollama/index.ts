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
    console.log('OLLAMA_API_URL:', OLLAMA_API_URL);

    if (!OLLAMA_API_URL) {
      throw new Error('OLLAMA_API_URL environment variable is not set');
    }

    const { query } = await req.json();
    console.log('Received query:', query);

    const apiUrl = new URL('/api/generate', OLLAMA_API_URL).toString();
    console.log('Making request to:', apiUrl);

    const ollamaResponse = await fetch(apiUrl, {
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

    console.log('Ollama response status:', ollamaResponse.status);

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error('Ollama API error:', {
        status: ollamaResponse.status,
        text: errorText,
        url: apiUrl,
      });
      throw new Error(`Ollama API error: ${ollamaResponse.status} - ${errorText}`);
    }

    const data = await ollamaResponse.json();
    console.log('Ollama response data:', data);

    return new Response(
      JSON.stringify({
        choices: [{
          message: {
            content: data.response
          }
        }]
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in edge function:', {
      message: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});