// Service helper to make direct calls to the official Google Gemini API

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function generateWithGemini(prompt: string, jsonMode: boolean = false): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: jsonMode ? {
            responseMimeType: "application/json"
          } : undefined
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!resultText) {
      throw new Error("Received empty content from Gemini model.");
    }

    return resultText;
  } catch (error: any) {
    console.error("Gemini API integration error:", error.message);
    throw error;
  }
}
