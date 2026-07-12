import { llm } from "../config/llm.js";

const sentimentAnalyzer = async (state) => {
  console.log("🎭 Node 4: Analyzing news sentiment...");

  const newsArticles = state.newsArticles;
  const companyName = state.companyName;

  if (!newsArticles || newsArticles.length === 0) {
    return {
      sentimentData: {
        overall: "NEUTRAL",
        summary: "No news articles available for sentiment analysis.",
        articles: []
      }
    };
  }

  // Format articles for GPT-4
  const articlesText = newsArticles
    .map((a, i) => `Article ${i + 1}: "${a.title}" - ${a.description}`)
    .join("\n");

  const response = await llm.invoke(`
You are a financial news sentiment analyst.

Analyze ONLY the news articles provided below for "${companyName}".

IMPORTANT RULES:

- Analyze EVERY article individually.
- Ignore articles that are not primarily about ${companyName}.
- For each article assign ONLY one label:
  POSITIVE
  NEGATIVE
  NEUTRAL
  IRRELEVANT

Determine the OVERALL sentiment using these rules:

- POSITIVE → More than 70% relevant articles are positive.
- NEGATIVE → More than 70% relevant articles are negative.
- MIXED → Positive and negative articles are both significant.
- NEUTRAL → Most articles are factual with little positive or negative impact.

DO NOT always choose POSITIVE.

Keep the summary under 30 words and use simple English.

News Articles:

${articlesText}

Return ONLY valid JSON.

{
  "overall":"POSITIVE | NEGATIVE | NEUTRAL | MIXED",
  "summary":"Maximum 30 words.",
  "articles":[
    {
      "title":"...",
      "sentiment":"POSITIVE | NEGATIVE | NEUTRAL | IRRELEVANT",
      "reason":"Maximum 12 words."
    }
  ]
}
`);

  try {
    const parsed = JSON.parse(response.content);
    return { sentimentData: parsed };
  } catch {
    // Fallback if JSON parsing fails
    return {
      sentimentData: {
        overall: "UNKNOWN",
        summary: response.content,
        articles: []
      }
    };
  }
};

export { sentimentAnalyzer };