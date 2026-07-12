import { StateGraph, START, END } from "@langchain/langgraph";
import { StateAnnotation } from "./state.js";

import { companyResearcher } from "../nodes/companyResearcher.js";
import { financialAnalyst } from "../nodes/financialAnalyst.js";
import { newsCollector } from "../nodes/newsCollector.js";
import { sentimentAnalyzer } from "../nodes/sentimentAnalyzer.js";
import { decisionMaker } from "../nodes/decisionMaker.js";

const graphBuilder = new StateGraph(StateAnnotation);

graphBuilder.addNode("companyResearcher", companyResearcher);
graphBuilder.addNode("financialAnalyst", financialAnalyst);
graphBuilder.addNode("newsCollector", newsCollector);
graphBuilder.addNode("sentimentAnalyzer", sentimentAnalyzer);
graphBuilder.addNode("decisionMaker", decisionMaker);

graphBuilder.addEdge(START, "companyResearcher");
graphBuilder.addEdge("companyResearcher", "financialAnalyst"); 
graphBuilder.addEdge("financialAnalyst", "newsCollector");
graphBuilder.addEdge("newsCollector", "sentimentAnalyzer"); 
graphBuilder.addEdge("sentimentAnalyzer", "decisionMaker");  
graphBuilder.addEdge("decisionMaker", END);

const investmentGraph = graphBuilder.compile();


export { investmentGraph };