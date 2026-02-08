import fs, { writeFile } from 'fs';
import express from "express";
import GenerateImage from "./routes/imageGenerator.js"
import docs from "./routes/docs.js"
const app = express();

const PORT = 3030;

app.get('/',(req,res)=>{
    res.send("it works");
});

app.use('/generateImage',GenerateImage);
app.use('/docs',docs);
app.listen(PORT,()=>console.log(`the server is running on Port ${PORT} on http://localhost:3030/`));