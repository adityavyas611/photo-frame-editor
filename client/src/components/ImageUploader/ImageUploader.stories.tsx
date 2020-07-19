import React from 'react';
import ImageUploader from './ImageUploader';

export default {
  component: ImageUploader,
  title: 'ImageUploader',
};

export const imageUploader = () => <ImageUploader/>;

imageUploader.story = {
  name: 'to imageUploader',
};
