import { Router } from "express";
import { investmentGraph } from "../graph/investmentGraph.js";

const router = Router();

router.post("/research", async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({ error: "Company name is required." });
        }

        console.log(`\n🚀 Starting research for: ${companyName}\n`);

        const result = await investmentGraph.invoke({
            companyName: companyName,
        });

        res.json({
            success: true,
            data: {
                companyName: result.companyName,
                companyProfile: result.companyProfile,
                rawFinancials: result.rawFinancials,
                financialData: result.financialData,
                newsArticles: result.newsArticles,
                sentimentData: result.sentimentData,
                verdict: result.verdict,
            },
        });
    } catch (error) {
        console.error("Research failed:", error);
        res.status(500).json({ error: "Research failed. Please try again." });
    }
});

export { router as researchRouter };