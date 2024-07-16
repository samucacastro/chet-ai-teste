import express from 'express';
import { gpt } from './controllers/ai.js';
import { getYoutubeMusic, getYoutubeVideo } from './controllers/youtube.js';
export const router = express.Router();

router.get("/gpt", gpt);
router.get("/music", getYoutubeMusic);
router.get("/video", getYoutubeVideo);
