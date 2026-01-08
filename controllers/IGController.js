function makeP3SolidPPM(width,height,r,g,b){
    const maxval = 255;

    let PPM = `P3\n${width} ${height}\n${maxval}\n`;
    for(let y = 0 ; y < height; y++){
        for(let x = 0; x < width; x++){
            PPM += `${r} ${g} ${b} `;
        }
        PPM+="\n";
    }

    return Buffer.from(PPM,"utf-8");
}

function WhichColor(Color)
{
    let rgb;
    switch(Color){
        case "red": rgb =[255, 0 , 0];
        break;
        case "green": rgb =[0, 255 , 0];
        break;
        case "blue": rgb =[0, 0 , 255];
        break;
        case "black": rgb =[0, 0 , 0];
        break;
        case "white": rgb =[255, 255 , 255];
        break;
        default: return null;
    }
    return rgb;
}

function makeP3CheckerboardPPM(width, height,rgb1,rgb2,squareSize){
    let maxval = 255;
    let ppmContent = `P3\n${width} ${height}\n${maxval}\n`;

    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
        const squareX = Math.floor(x / squareSize);
        const squareY = Math.floor(y / squareSize);
        const isFirstColor = (squareX+squareY) %2 === 0;
        const [r,g,b] = isFirstColor ? rgb1:rgb2;
        ppmContent+=`${r} ${g} ${b} `;
        }
        ppmContent += '\n';
    }
    return Buffer.from(ppmContent, "utf-8");

}
export const generateImageFromClient = (req, res)=>{
    const Color = String(req.params.color).toLowerCase();

    let rgb = WhichColor(Color);

    if(rgb === null){
        return res.status(400).json({
                error:{code: "invalid_color i am here", message:"Use red, green, blue, black, or white."}
            })
    }
        
    const ppmBuffer = makeP3SolidPPM(64,64, ...rgb);

    res.set("Content-Type","image/x-portable-pixmap");
    res.set("Content-Disposition",`attachment; filename="${Color}.ppm"`);
    res.send(ppmBuffer);
}

export const generateCheckerboard = (req, res)=>{
    const colorsParam = req.query.colors

    const colors = colorsParam.split(',').map(color => color.trim().toLowerCase());
    //const color:[a,b] = colorsParam
    console.log(colors);
    const rgb1 = WhichColor(colors[0]);
    const rgb2 = WhichColor(colors[1]);

    const ppmBuffer = makeP3CheckerboardPPM(64,64,rgb1,rgb2,8);
    /*res.json({
        image: ppmBuffer.toString('base64'),  // Image as base64
        metadata: {
            colors: [colors[0], colors[1]],
            size: { width: 64, height: 64 },
            squareSize: 8
        },
        downloadUrl: `/generateImage/checkerboard?colors=${req.query.colors}`
    });*/

    res.set("Content-Type","image/x-portable-pixmap");
    res.set("Content-Disposition",`attachment; filename="checkerboard.ppm"`);
    res.send(ppmBuffer);
};