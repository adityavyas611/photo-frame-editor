import React from 'react';
import Editor from './Editor';

export default {
  component: Editor,
  title: 'Editor',
};

const imageData = {
  name: 'Aditya'
};

export const editor = () => <Editor imgData={imageData} imgUrl="https://www.online-image-editor.com/styles/2019/images/power_girl.png" />;

editor.story = {
  name: 'to Editor',
};
