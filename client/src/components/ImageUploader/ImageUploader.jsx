import React, { useState } from 'react';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';
import './ImageUploader.css';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (event) => {
    const { target: { files } } = event;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    setImage(files[0]);
  };
  
  return (
    <div>
      <Header showPublish={image}/>
      {!image ?
        <div className="background-container">
          <label htmlFor="files" className="button-position">Upload</label>
          <input id="files" className="input-file" type="file" accept="image/*" onChange={handleChange} />
        </div>
        : <div className="background-container">
            <Editor imgData={image} imgUrl={imageUrl}/>
          </div>
      }
    </div>
  )
};

export default ImageUploader;