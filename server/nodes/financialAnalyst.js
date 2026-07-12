import { llm } from "../config/llm.js";
import { financialTool } from "../tools/financialTool.js";

const financialAnalyst = async (state) => {
  console.log("💰 Node 2: Analyzing financial data...");

  const companyName = state.companyName;
  const toolOutput = await financialTool.invoke(companyName);

  console.log("=================================");
  console.log("RAW FINANCIAL DATA FROM TOOL");
  console.log(toolOutput);
  console.log("=================================");

  let rawFinancials = null;
  let formattedData = toolOutput;
  
  try {
    const parsed = JSON.parse(toolOutput);
    rawFinancials = parsed.raw;
    formattedData = parsed.formatted;
  } catch {
    // Tool returned plain text (fallback)
  }

  const response = await llm.invoke(
    `You are a senior financial analyst. Below is REAL financial data fetched 
     from a financial API for "${companyName}". 
     
     IMPORTANT RULES:
     - Use ONLY the actual numbers provided below in your analysis.
     - Reference specific numbers (e.g., "P/E ratio of 32.45 suggests...").
     - Do NOT say "I don't have access to real-time data" — the data IS provided below.
     - Do NOT generate generic frameworks or templates.
     - If a specific metric shows "N/A", skip it and analyze what IS available.
     
     REAL FINANCIAL DATA:
     ${formattedData}
     
     Provide a professional financial analysis covering:
     1. Valuation Assessment (using P/E, P/B, P/S ratios — is it overvalued or undervalued?)
     2. Profitability Analysis (using margins, ROE, ROA)
     3. Financial Health (using debt-to-equity, current ratio)
     4. Key Strengths (backed by specific numbers)
     5. Key Concerns (backed by specific numbers)`
  );

  console.log("RAW FINANCIAL DATA:");
  console.log(toolOutput);

  return { 
    financialData: response.content,
    rawFinancials: rawFinancials
  };
};

export { financialAnalyst };