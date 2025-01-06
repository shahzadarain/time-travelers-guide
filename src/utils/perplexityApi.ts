export const makePerplexityRequest = async (query: string, apiKey: string) => {
  console.log("Making Perplexity API request for query:", query);
  
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: `You are a time conversion assistant. Extract time and location information from the query and respond with ONLY a JSON object in this EXACT format, with NO additional text or explanation:
{"sourceLocation":"LOCATION","sourceTime":"HH:mm","targetLocation":"LOCATION"}
Use only city or country names without extra words. For example: "Paris", "Tokyo", "United States", etc.
For the time, always convert to 24-hour format.`
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.1,
      }),
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