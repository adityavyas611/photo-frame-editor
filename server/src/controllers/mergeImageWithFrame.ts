import express from 'express';
import { createCanvas, loadImage } from "canvas";
import logger from '../utils/logger';

const createImageUrlFromCanvas = async (userImage: string, frameImage: string) => {
  try {
  // loading both the images in canvas
  const loadUserImage = await loadImage(userImage);
  const loadFrameImage = await loadImage(frameImage);

  // choosing maxWidth and maxHeight among the images
  const maxWidth = Math.max(loadUserImage.width, loadFrameImage.width);
  const maxHeight = Math.max(loadUserImage.width, loadFrameImage.height);

  // setting canvas to maxWidth and maxHeight
  const canvas = createCanvas(maxWidth,maxHeight);
  const ctx = canvas.getContext('2d');

  // drawing frame image on the edges of canvas
  ctx.drawImage(loadFrameImage, 0,0, maxWidth, maxHeight);
  ctx.globalCompositeOperation='destination-over';
  // drawing the user uploaded image inside frame
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
    res.send({data: framedImage});
  } catch (err) {
    logger.error(`Error in mergeImageWithFrame: ${err}`);
    res.send({data: err});
  }
};
