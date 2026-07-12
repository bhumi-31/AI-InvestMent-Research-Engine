import { llm } from "../config/llm.js";

import { companySearchTool } from "../tools/companySearchTool.js";

const companyResearcher = async (state) => {
    console.log("Researching company profile...");

    const companyName = state.companyName;

    const searchResults = await companySearchTool.invoke(companyName);

    const response = await llm.invoke(
    `You are a company research analyst. Based on the following search results, 
     create a comprehensive company profile for "${companyName}".
     
     Include: what the company does, industry, key products/services, 
     CEO, headquarters, founding year, and market position.
     
     Search Results:
     ${searchResults}
     
     Provide a clear, well-structured company profile.`
    );

    return { companyProfile: response.content };
}

export { companyResearcher };