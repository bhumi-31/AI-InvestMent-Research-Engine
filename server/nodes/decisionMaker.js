import { llm } from "../config/llm.js";

const decisionMaker = async (state) => {
  console.log("⚖️ Node 5: Making investment decision...");

  const companyProfile = state.companyProfile;
  const financialData = state.financialData;
  const newsArticles = state.newsArticles;
  const sentimentData = state.sentimentData;

  // Format news for the prompt
  const newsText = Array.isArray(newsArticles)
    ? newsArticles.map((a, i) => `${i + 1}. "${a.title}" (${a.source})`).join("\n")
    : "No news available";

  // Format sentiment for the prompt
  const sentimentText = sentimentData && typeof sentimentData === 'object'
    ? `Overall: ${sentimentData.overall}. ${sentimentData.summary}`
    : "No sentiment data available";

  const response = await llm.invoke(
    `You are an expert investment advisor whose job is to explain investment decisions to people with NO finance background.

Your goal is NOT just to analyze numbers.
Your goal is to help a beginner understand whether investing is a good idea.

Use ONLY the information provided below.

========================
COMPANY PROFILE
========================
${companyProfile}

========================
FINANCIAL ANALYSIS
========================
${financialData}

========================
RECENT NEWS
========================
${newsText}

========================
NEWS SENTIMENT
========================
${sentimentText}

Rules:

- Do NOT use difficult financial jargon.
- Keep explanations simple and practical.
- Mention specific numbers only when they help the explanation.
- Every sentence should be understandable by someone new to investing.
- Explain WHY the recommendation is INVEST or PASS.
- Keep the reasoning under 120 words.
- Risks and Growth Catalysts should be short bullet points.
- Avoid generic statements.
- Never mention that you are an AI.

Return ONLY valid JSON.

{
  "decision":"INVEST or PASS",

  "confidence":82,

  "reasoning":"Explain the recommendation in simple English. Mention the biggest strengths and biggest concerns in a short paragraph.",

  "risks":[
     "Short simple risk",
     "Short simple risk",
     "Short simple risk"
  ],

  "catalysts":[
     "Short simple positive point",
     "Short simple positive point",
     "Short simple positive point"
  ]
}
`
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