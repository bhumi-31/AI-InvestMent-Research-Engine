import axios from "axios";

const API_URL = "http://localhost:8000";

export const researchCompany = async (companyName) => {
    const response = await axios.post(`${API_URL}/research`, {
        companyName :companyName,
    });

    return response.data;
};