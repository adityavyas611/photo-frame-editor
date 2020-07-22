import { BACKEND_URI } from '../const';

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
