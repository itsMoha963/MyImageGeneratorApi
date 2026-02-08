import express from "express";
import { generateImageFromClient, generateCheckerboard, generateStar } from "../controllers/IGController.js";
const router = express.Router();

router.get('/solid/:color', generateImageFromClient);

router.get('/checkerboard',generateCheckerboard);

router.get(`/star/:color`,generateStar)

export default router;