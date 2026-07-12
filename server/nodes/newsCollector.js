import { newsTool } from "../tools/newsTool.js";

const newsCollector = async (state) => {
  console.log("📰 Node 3: Collecting recent news...");

  const companyName = state.companyName;
  const rawNews = await newsTool.invoke(companyName);

  // Parse the fixed-format tool output into structured array
  const articles = [];
  const articleBlocks = rawNews.split(/Article \d+:/i).filter(block => block.trim());
  
  for (const block of articleBlocks) {
    const title = block.match(/Title:\s*(.+)/i)?.[1]?.trim() || "";
    const source = block.match(/Source:\s*(.+)/i)?.[1]?.trim() || "";
    const date = block.match(/Date:\s*(.+)/i)?.[1]?.trim() || "";
    const description = block.match(/Description:\s*(.+)/i)?.[1]?.trim() || "";
    
    if (title) {
      articles.push({ title, source, date, description });
    }
  }

  return { newsArticles: articles.length > 0 ? articles : [] };
};

export { newsCollector };