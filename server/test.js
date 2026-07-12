import dotenv from "dotenv";

dotenv.config();

console.log("TAVILY:", process.env.TAVILY_API_KEY);
console.log("OPENAI:", process.env.OPENAI_API_KEY);
console.log("FMP:", process.env.FMP_API_KEY);