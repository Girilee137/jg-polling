import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { question } = await request.json();

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      `Answer in 1-2 sentences only: ${question}`
    );

    return Response.json({
      answer: result.response.text(),
    });

  } catch (error) {
    return Response.json({
      answer: error.message,
    });
  }
}
