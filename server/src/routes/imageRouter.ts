import express from 'express';
import { mergeImageWithFrame } from '../controllers/mergeImageWithFrame';

const router = express.Router();

router.post('/mergeImages', mergeImageWithFrame);

export default router;
