import express from "express";
import { generateImageFromClient, generateCheckerboard } from "../controllers/IGController.js";
const router = express.Router();

router.get('/solid/:color', generateImageFromClient);

router.get('/checkerboard',generateCheckerboard);



export default router;