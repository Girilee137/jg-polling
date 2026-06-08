import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export async function POST(request) {
  try {
    const { question } = await request.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `Answer in 1-2 sentences only: ${question}`
    );

    const answer = result.response.text();

    return Response.json({ answer });

  } catch (error) {
    console.error("Gemini Error:", error);

    return Response.json({
      answer: `Error: ${error.message}`,
    });
  }
}
