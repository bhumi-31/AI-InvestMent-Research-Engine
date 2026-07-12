import dotenv from 'dotenv';
//load env
dotenv.config();

import express from 'express';
import cors from 'cors';
import { researchRouter } from "./routes/researchRoute.js";




//create express application
const app = express();

const PORT = process.env.PORT || 8000;


//middleware

//allow frontend to send request to particular backend 
app.use(cors());
//parse incoming json req bodies
app.use(express.json()); 

app.use(researchRouter);

app.get("/", (req, res) => {
    res.json({
        message : "AI Investment Research Engine - Server is running!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
