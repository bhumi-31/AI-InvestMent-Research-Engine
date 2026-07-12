import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
    modelName : "gpt-4o-mini",
    temperature : 0.3 //most;=ly focused and slightly creative
});

export {llm};
