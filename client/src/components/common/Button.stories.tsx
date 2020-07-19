import React from 'react';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
};

export const button = () => <Button buttonName="Show" />;

button.story = {
  name: 'to show button',
};
