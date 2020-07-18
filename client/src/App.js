import React from 'react';
import Header from './components/Header/Header';
import ImageUploader from './components/ImageUploader/ImageUploader';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <ImageUploader />
    </div>
  );
}

export default App;
