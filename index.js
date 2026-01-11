import fs, { writeFile } from 'fs';
import express from "express";
import GenerateImage from "./routes/imageGenerator.js"
const app = express();

const PORT = 3030;

app.get('/',(req,res)=>{
    res.send("it works");
});

app.use('/generateImage',GenerateImage);

app.listen(PORT,()=>console.log(`the server is running on Port ${PORT} on http://localhost:3030/`));

const width = 128;
const height = 128;
const maxval = 255;
const xmiddle = width / 2;
const ymiddle = height / 2;
const squareSize = 16;


function clearImage(){
const width = 128;
const height = 128;
const maxval = 255;
let ppmContent = `P3\n${width} ${height}\n${maxval}\n`;
return ppmContent;
}


function saveImage(imagename,ppmContent){
    fs.writeFile(imagename,ppmContent,(err)=>{
    if(err)
        console.log(`error writing file ${err}`);
    else
        console.log(`PPM file created yayy`);
})
}



// Calculate anti-diagonal sum dynamically
// Anti-diagonal goes from (width-1, ymiddle) to (xmiddle, height-1)
// i take the middle of y or x and sum it to   the max pooint at the end for example (127, 64) = 191
const antiDiagonalSum = (width - 1) + ymiddle; // or equivalently: xmiddle + (height - 1)

// PPM header
let ppmContent = `P3\n${width} ${height}\n${maxval}\n`;

for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
        

        if( ((y === ymiddle) || (y > ymiddle)) && x >= xmiddle)
            if(y == x || (y+x) === antiDiagonalSum)
                ppmContent+= `0 255 0 `;
            else
                ppmContent+= `0 0 0 `;
        else if ((y === ymiddle) || (y >ymiddle) && x <= xmiddle)
            ppmContent += `0 0 255 `;
        else if((y=== ymiddle * 0.5|| (y < ymiddle*0.5)) && x <= xmiddle)
            ppmContent += `0 255 0 `;
        else
            ppmContent+= `255 0 0 `;


    
        
            
    }
    ppmContent += '\n';
}

saveImage("test.ppm",ppmContent);
ppmContent = clearImage();


for(let y = 0; y < height; y++){
    for ( let x = 0; x < width; x++ ){
        const distance = Math.sqrt((x-xmiddle)**2 + (y-ymiddle)**2);
        if(y=== height*(1/3) || y < height*(1/3))
            ppmContent += `50 120 50 `;
        else if(y === height * (2/3) || y > height* (2/3))
            ppmContent+= `20 20 20 `;
        else if(distance <= 20)
            ppmContent += `255 0 255 `; 
        else
            ppmContent += `255 255 255 `;
    }
    ppmContent += "\n";
}
//console.log(ppmContent + "cleared ppm content");
saveImage("Flag.ppm",ppmContent);