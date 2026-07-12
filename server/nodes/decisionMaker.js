import { llm } from "../config/llm.js";

const decisionMaker = async (state) => {
  console.log("⚖️ Node 5: Making investment decision...");

  const companyProfile = state.companyProfile;
  const financialData = state.financialData;
  const newsArticles = state.newsArticles;
  const sentimentData = state.sentimentData;

  // Format news for the prompt
  const newsText = Array.isArray(newsArticles) 
    ? newsArticles.map((a, i) => `${i+1}. "${a.title}" (${a.source})`).join("\n")
    : "No news available";

  // Format sentiment for the prompt
  const sentimentText = sentimentData && typeof sentimentData === 'object'
    ? `Overall: ${sentimentData.overall}. ${sentimentData.summary}`
    : "No sentiment data available";

  const response = await llm.invoke(
    `You are a senior investment advisor at a top-tier investment firm.
     Make a final investment decision based ONLY on the research data provided below.
     
     IMPORTANT RULES:
     - Base your decision ONLY on the data provided. Do NOT use general knowledge.
     - Reference SPECIFIC numbers, facts, and articles in your reasoning.
     
     === COMPANY PROFILE ===
     ${companyProfile}
     
     === FINANCIAL ANALYSIS ===
     ${financialData}
     
     === RECENT NEWS ===
     ${newsText}
     
     === NEWS SENTIMENT ===
     ${sentimentText}
     
     You MUST respond with ONLY valid JSON in this exact format (no markdown, no backticks, no extra text):
     {
       "decision": "INVEST or PASS",
       "confidence": 75,
       "reasoning": "A detailed paragraph citing specific numbers and news from the data above",
       "risks": ["Risk 1 with specific data reference", "Risk 2", "Risk 3"],
       "catalysts": ["Catalyst 1 with specific data reference", "Catalyst 2", "Catalyst 3"]
     }`
  );

  console.log("Company Profile:", companyProfile);
  console.log("Financial Data:", financialData);
  console.log("News:", newsArticles);
  console.log("Sentiment:", sentimentData);

  try {
    const parsed = JSON.parse(response.content);
    return { verdict: parsed };
  } catch {
    // Fallback
    return { 
      verdict: {
        decision: "HOLD",
        confidence: 50,
        reasoning: response.content,
        risks: ["Unable to parse structured response"],
        catalysts: ["Unable to parse structured response"]
      }
    };
  }
};

export { decisionMaker };