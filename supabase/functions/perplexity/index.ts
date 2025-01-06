import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

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
    const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
    if (!PERPLEXITY_API_KEY) {
      throw new Error('PERPLEXITY_API_KEY is not set');
    }

    const { query } = await req.json();
    console.log("Processing query:", query);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: `You are a time conversion assistant. Extract time and location information from the query and respond with ONLY a JSON object in this EXACT format, with NO additional text or explanation:
{"sourceLocation":"LOCATION","sourceTime":"HH:mm","targetLocation":"LOCATION"}
Use only city or country names without extra words. For example: "Paris", "Tokyo", "United States", etc.
For the time, always convert to 24-hour format.`
          },
          {
            role: 'user',
            content: query
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Perplexity API Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Perplexity API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Perplexity API Response:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: error.message === 'Unauthorized' ? 401 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});