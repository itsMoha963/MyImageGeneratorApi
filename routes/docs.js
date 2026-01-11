import express from 'express';

const router = express.Router();
router.get('/',(req,res)=>{
    res.send(
        {
            GenerateSolidImage : "generateImage/solid/:color",
            GenerateCheckerboard : "generateImage/checkerboard?colors=color1,color2",
        }
    );
});
export default router;
