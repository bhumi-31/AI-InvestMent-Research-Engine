import { Annotation } from "@langchain/langgraph";

const StateAnnotation = Annotation.Root({
    companyName: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => "",
    }),
    companyProfile: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => "",
    }),
    rawFinancials: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => null,
    }),
    financialData: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => "",
    }),
    newsArticles: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => null,
    }),
    sentimentData: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => null,
    }),
    verdict: Annotation({
        reducer: (_, newVal) => newVal,
        default: () => null,
    }),
});

export { StateAnnotation };