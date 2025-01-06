export const makePerplexityRequest = async (query: string, apiKey: string) => {
  console.log("Making Perplexity API request for query:", query);
  
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-sonar-small-128k-online",
      messages: [
        {
          role: "system",
          content: `You are a time conversion assistant. Extract time and location information from the query and respond with ONLY a JSON object in this EXACT format, with NO additional text or explanation:
{"sourceLocation":"LOCATION","sourceTime":"HH:mm","targetLocation":"LOCATION"}
Use only city or country names without extra words. For example: "Paris", "Tokyo", "United States", etc.`
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
    throw new Error("Failed to process query");
  }

  return response.json();
};