import axios from "axios";

const API_URL = "https://ai-investment-research-engine.onrender.co";

export const researchCompany = async (companyName) => {
    const response = await axios.post(`${API_URL}/research`, {
        companyName :companyName,
    });

    return response.data;
};