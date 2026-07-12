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

  const response = await llm.invoke(
    `You are a sentiment analysis expert specializing in financial news.
     Analyze the sentiment of EACH news article below about "${companyName}".
     
     IMPORTANT: Only analyze articles directly about "${companyName}".
     If an article is not about ${companyName}, mark its sentiment as "IRRELEVANT".
     
     News Articles:
     ${articlesText}
     
     You MUST respond with ONLY valid JSON in this exact format (no markdown, no backticks, no extra text):
     {
       "overall": "POSITIVE or NEGATIVE or NEUTRAL or MIXED",
       "summary": "2-3 sentence summary of what the news means for ${companyName} as an investment",
       "articles": [
         {
           "title": "article title",
           "sentiment": "POSITIVE or NEGATIVE or NEUTRAL or IRRELEVANT",
           "reason": "one sentence reason"
         }
       ]
     }`
  );

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