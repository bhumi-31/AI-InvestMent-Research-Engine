import YahooFinance from "yahoo-finance2";
import { DynamicTool } from "@langchain/core/tools";

const yahooFinance = new YahooFinance({
    suppressNotices: ["yahooSurvey"],
});

const formatNumber = (num) => {
    if (num === undefined || num === null) return "N/A";

    if (Math.abs(num) >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (Math.abs(num) >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (Math.abs(num) >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (Math.abs(num) >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;

    return `$${Number(num).toLocaleString()}`;
};

const formatPercent = (value) => {
    if (value === undefined || value === null) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
};

const getFinancialData = async (companyName) => {
    try {
        // Search company
        const search = await yahooFinance.search(companyName);

        if (!search.quotes || search.quotes.length === 0) {
            return JSON.stringify({
                formatted: `No company found for "${companyName}".`,
                raw: null
            });
        }

        const company = search.quotes[0];
        const symbol = company.symbol;

        // Live quote
        const quote = await yahooFinance.quote(symbol);

        // Financials
        const summary = await yahooFinance.quoteSummary(symbol, {
            modules: [
                "assetProfile",
                "financialData",
                "defaultKeyStatistics",
            ],
        });

        const profile = summary.assetProfile || {};
        const financial = summary.financialData || {};
        const stats = summary.defaultKeyStatistics || {};

        const companyNameResolved =
            quote.longName ||
            quote.shortName ||
            company.shortname ||
            companyName;

        const marketCap =
            quote.marketCap ??
            financial.marketCap ??
            stats.marketCap;

        const currentPrice =
            quote.regularMarketPrice ??
            financial.currentPrice;

        const peRatio =
            quote.trailingPE ??
            stats.trailingPE;

        const pbRatio =
            quote.priceToBook ??
            stats.priceToBook;

        const eps =
            quote.epsTrailingTwelveMonths ??
            stats.trailingEps;

        const revenue =
            financial.totalRevenue;

        const netIncome =
            financial.netIncomeToCommon ??
            stats.netIncomeToCommon;

        const currentRatio =
            financial.currentRatio;

        const debtToEquity =
            financial.debtToEquity;

        const roe =
            financial.returnOnEquity;

        const roa =
            financial.returnOnAssets;

        const grossMargin =
            financial.grossMargins;

        const operatingMargin =
            financial.operatingMargins;

        const profitMargin =
            financial.profitMargins;

        const sector = profile.sector || "N/A";
        const industry = profile.industry || "N/A";

        const formatted = `
==============================
COMPANY OVERVIEW
==============================

Company: ${companyNameResolved}
Symbol: ${symbol}

Market Cap: ${formatNumber(marketCap)}
Current Price: ${currentPrice != null ? `$${currentPrice}` : "N/A"}

------------------------------
VALUATION
------------------------------

P/E Ratio: ${peRatio ?? "N/A"}
P/B Ratio: ${pbRatio ?? "N/A"}
EPS: ${eps ?? "N/A"}

------------------------------
FINANCIAL PERFORMANCE
------------------------------

Revenue: ${formatNumber(revenue)}
Net Income: ${formatNumber(netIncome)}

Gross Margin: ${formatPercent(grossMargin)}
Operating Margin: ${formatPercent(operatingMargin)}
Profit Margin: ${formatPercent(profitMargin)}

ROE: ${formatPercent(roe)}
ROA: ${formatPercent(roa)}

------------------------------
FINANCIAL HEALTH
------------------------------

Current Ratio: ${currentRatio ?? "N/A"}
Debt-to-Equity: ${debtToEquity ?? "N/A"}

------------------------------
BUSINESS
------------------------------

Sector: ${sector}
Industry: ${industry}`.trim();

        return JSON.stringify({
            formatted: formatted,
            raw: {
                companyName: companyNameResolved,
                symbol: symbol,
                price: currentPrice,
                marketCap: marketCap,
                peRatio: peRatio,
                pbRatio: pbRatio,
                eps: eps,
                revenue: revenue,
                netIncome: netIncome,
                grossMargin: grossMargin,
                operatingMargin: operatingMargin,
                profitMargin: profitMargin,
                roe: roe,
                roa: roa,
                debtToEquity: debtToEquity,
                currentRatio: currentRatio,
                sector: sector,
                industry: industry
            }
        });
    } catch (err) {
        console.error("Financial Tool Error:", err);

        return JSON.stringify({
            formatted: `Unable to fetch financial information for "${companyName}". Error: ${err.message}`,
            raw: null
        });
    }
};

export const financialTool = new DynamicTool({
    name: "financial_data",
    description:
        "Fetches real-time financial data including valuation, profitability, financial health, and company overview using Yahoo Finance.",
    func: async (companyName) => {
        return await getFinancialData(companyName);
    },
});

export default financialTool;