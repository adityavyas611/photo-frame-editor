import React from 'react';
import Header from './Header';

export default {
  component: Header,
  title: 'Header',
};

export const header = () => <Header/>;

header.story = {
  name: 'to header',
};
