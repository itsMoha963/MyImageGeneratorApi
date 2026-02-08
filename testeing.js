import fs from 'fs';

const width = 128;
const height = 128;
const maxval = 255;
const xmiddle = width / 2;
const ymiddle = height / 2;
const squareSize = 16;


function clearImage(width,height,maxval){
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
ppmContent = clearImage(128,128,255);


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
saveImage("images/Flag.ppm",ppmContent);

ppmContent = clearImage(128,128,255);

for(let y = 0; y< height; y++){
    for(let x = 0; x < width; x++){
       // if((y === x && x >= xmiddle) || y <= ymiddle)
       // if( x >= xmiddle && y >= xmiddle|| x == xmiddle )
        if(((y === x) || (x === xmiddle)) && (x >= xmiddle - squareSize/2 && x <= xmiddle + squareSize/2))
           ppmContent += '0 0 0 '; // R G B
        else
            ppmContent += '255 255 255 ';
    }
    ppmContent+='\n';
}

saveImage("new.ppm",ppmContent);
ppmContent = clearImage(128,128,255);
for(let y = 0; y < height; y++){
    for(let x = 0; x< width; x++){
        if(x == xmiddle )
            ppmContent+= `0 0 0 `;
        else
        ppmContent += `150 150 150 `;
    }
    ppmContent+=`\n`;
}
saveImage("images/rectamgle.ppm",ppmContent);


/*function IsSquare(x){
    if(x < 0) return false;
    const value = Math.sqrt(x);
    return Number.isInteger(value);
}

console.log("result:", IsSquare(16));

function factors(x) {

  const start = Math.ceil(Math.sqrt(x));
  for (let i = start; i <= x; i++) // while loop is better for better solutions endless loop
  {
    const diff = i * i - x;       
    if (IsSquare(diff)) {
      const b = Math.sqrt(diff);
      const factor1 = i - b;
      const factor2 = i + b;
      return [factor1,factor2];
    }
  }
  return [0,0];
}

function factors2(x) {
  for (let i = 2; i <= Math.sqrt(x); i++) {
    if (x % i === 0) {
      return [i, x / i];
    }
  }
  return [1, x]; 
}

console.log("factors(15) = ±±values: ",factors2(15));

*/

// Star drawing functions
function generateStarVertices(centerX, centerY, outerRadius, innerRadius, numPoints = 5, rotation = -Math.PI / 2) {
    const vertices = [];
    
    for (let i = 0; i < numPoints * 2; i++) {
        const angle = rotation + (i * Math.PI) / numPoints;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        vertices.push({ x, y });
    }
    
    return vertices;
}

function edgeCrossesY(y1, y2, targetY) {
    return (y1 > targetY) !== (y2 > targetY);
}

function getEdgeIntersectionX(x1, y1, x2, y2, targetY) {
    return (x2 - x1) * (targetY - y1) / (y2 - y1) + x1;
}

function countRayCrossings(x, y, vertices) {
    let crossings = 0;
    
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;
        
        if (edgeCrossesY(yi, yj, y)) {
            const intersectionX = getEdgeIntersectionX(xj, yj, xi, yi, y);
            if (x < intersectionX) {
                crossings++;
            }
        }
    }
    
    return crossings;
}

function isPointInsidePolygon(x, y, vertices) {
    const crossings = countRayCrossings(x, y, vertices);
    return crossings % 2 === 1;
}

// Draw stars

ppmContent = clearImage(128, 128, 255);

const starCenterX = width / 2;
const starCenterY = height / 2;
const starOuterRadius = 40;
const starInnerRadius = 16;

const starVertices = generateStarVertices(starCenterX, starCenterY, starOuterRadius, starInnerRadius);

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (isPointInsidePolygon(x, y, starVertices)) {
            ppmContent += `255 255 0 `;
        } else {
            ppmContent += '255 200 150 ';
        }
    }
    ppmContent += '\n';
}
saveImage("star2.ppm", ppmContent);


ppmContent = clearImage(128,128,255);

const frames = 60;
const startRotation = -Math.PI / 2;

for (let k = 0; k < frames; k++) {
  const rotation = startRotation + k * (2 * Math.PI / frames);
  const starVertices = generateStarVertices(starCenterX, starCenterY, starOuterRadius, starInnerRadius, 5, rotation);
  let ppmContent = clearImage(128, 128, 255);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isPointInsidePolygon(x, y, starVertices)) {
        ppmContent += `255 255 0 `;
      } else {
        ppmContent += `255 200 150 `;
      }
    }
    ppmContent += "\n";
  }

  const name = String(k).padStart(3, "0");
  saveImage(`images/star_${name}.ppm`, ppmContent);
}