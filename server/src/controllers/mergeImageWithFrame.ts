import express from 'express';
import { createCanvas, loadImage } from "canvas";
import logger from '../utils/logger';

const createImageUrlFromCanvas = async (userImage: string, frameImage: string) => {
  try {
    
  const loadUserImage = await loadImage(userImage);
  const loadFrameImage = await loadImage(frameImage);

  const maxWidth = Math.max(loadUserImage.width, loadFrameImage.width);
  const maxHeight = Math.max(loadUserImage.width, loadFrameImage.height);

  const canvas = createCanvas(maxWidth,maxHeight);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(loadFrameImage, 0,0, maxWidth, maxHeight);
  ctx.globalCompositeOperation='destination-over';
  ctx.drawImage(loadUserImage, 10, 10, maxWidth - 50, maxHeight - 50);

  return canvas.toDataURL('image/png');
  } catch (err) {
    logger.error(`Error in createImageFromCanvas: ${err}`);
    return err;
  }
};

export const mergeImageWithFrame = async (req: express.Request, res: express.Response) => {
  const { userImage, frameImage} = req.body;
  try {
    const framedImage = await createImageUrlFromCanvas(userImage, frameImage);
    res.send({data: frameImage});
  } catch (err) {
    logger.error(`Error in mergeImageWithFrame: ${err}`);
    res.send({data: err});
  }
};
