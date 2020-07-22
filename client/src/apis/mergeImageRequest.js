import { BACKEND_URI } from '../const';

/**
 * 
 * @param {*} userImages - The object containing user uploaded image and frame selected by user
 * @description - The function is used to send the images and recieve the merged image.
 */

const mergeImageRequest = async (userImages) => {
  const res = await fetch(`${BACKEND_URI}image/mergeImages`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(userImages)
  });
  const data = await res.json();
  return data;
};

export { mergeImageRequest };
