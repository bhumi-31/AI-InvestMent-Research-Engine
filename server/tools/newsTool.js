import { DynamicTool } from "@langchain/core/tools";

const getNews = async (companyName) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const fmpKey = process.env.FMP_API_KEY;

    // Step 1: Get ticker symbol and official company name from FMP
    // "Tesla" → ticker: "TSLA", official name: "Tesla, Inc."
    // This gives us MORE search terms to find relevant articles
    let ticker = "";
    let officialName = companyName;

    try {
      const fmpUrl = `https://financialmodelingprep.com/api/v3/search?query=${encodeURIComponent(companyName)}&limit=1&apikey=${fmpKey}`;
      const fmpResponse = await fetch(fmpUrl);
      const fmpData = await fmpResponse.json();

      if (fmpData && fmpData.length > 0) {
        ticker = fmpData[0].symbol;
        officialName = fmpData[0].name || companyName;
      }
    } catch {
      // If FMP fails, continue with just the company name
    }

    // Step 2: Build search query with company name + ticker + official name
    // "Tesla" OR "TSLA" OR "Tesla, Inc." — catches all variations
    let query = `"${companyName}"`;
    if (ticker) query += ` OR "${ticker}"`;
    if (officialName !== companyName) query += ` OR "${officialName}"`;

    // Step 3: Fetch more candidates (15), we'll filter down to best 5
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&searchIn=title,description&sortBy=publishedAt&pageSize=15&language=en&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      return `No recent news found for "${companyName}".`;
    }

    // Step 4: Score each article by relevance
    // Articles where company is the MAIN SUBJECT (in title) rank higher
    // than articles that merely mention the company
    const searchTerms = [companyName.toLowerCase()];
    if (ticker) searchTerms.push(ticker.toLowerCase());
    if (officialName !== companyName) searchTerms.push(officialName.toLowerCase());

    const scoredArticles = data.articles
      .map((article) => {
        const title = (article.title || "").toLowerCase();
        const description = (article.description || "").toLowerCase();

        let score = 0;

        for (const term of searchTerms) {
          // Company in TITLE = very relevant (article is ABOUT the company)
          if (title.includes(term)) score += 3;
          // Company in DESCRIPTION = somewhat relevant
          if (description.includes(term)) score += 1;
        }

        return { article, score };
      })
      // Remove articles with score 0 (no match at all)
      .filter((item) => item.score > 0)
      // Sort by relevance score (highest first)
      .sort((a, b) => b.score - a.score);

    if (scoredArticles.length === 0) {
      return `No relevant news found specifically about "${companyName}".`;
    }

    // Step 5: Take top 5 most relevant articles
    const topArticles = scoredArticles.slice(0, 5);

    const articles = topArticles
      .map((item, index) => {
        const a = item.article;
        return `
        Article ${index + 1}:
        Title: ${a.title}
        Source: ${a.source.name}
        Date: ${a.publishedAt}
        Description: ${a.description || "No description available"}
        `;
      })
      .join("\n");
    return articles;

  } catch (error) {
    return `Error fetching news: ${error.message}`;
  }
};

const newsTool = new DynamicTool({
  name: "news_fetcher",
  description: "Fetches recent news articles about a given company",
  func: getNews,
});

export { newsTool };