import "dotenv/config";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

const companySearchTool = new TavilySearchResults({
    apiKey: process.env.TAVILY_API_KEY,
    maxResults : 5,
});

export { companySearchTool };