import fs from 'fs';
import express from "express";
import GenerateImage from "./routes/imageGenerator.js"
const app = express();

const PORT = 3030;

app.get('/',(req,res)=>{
    res.send("it works");
});

app.use('/generateImage',GenerateImage);

app.listen(PORT,()=>console.log(`the server is running on Port ${PORT} on http://localhost:3030/`));

/*const width = 128;
const height = 128;
const maxval = 255;

const squareSize = 16;
// PPM header
let ppmContent = `P3\n${width} ${height}\n${maxval}\n`;

for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
        const squareX = Math.floor(x / squareSize);
        const squareY = Math.floor(y / squareSize);
        const isBlackSquare = (squareX+squareY) %2 === 0;
        if(isBlackSquare)
            ppmContent += '0 0 0 ';
        else 
            ppmContent += '255 0 0 '; // Red pixel (R G B)
            
    }
    ppmContent += '\n';
}

fs.writeFile("test.ppm",ppmContent,(err)=>{
    if(err)
        console.log(`error writing file ${err}`);
    else
        console.log(`PPM file created yayy`);
})

*/
