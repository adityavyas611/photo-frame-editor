import React, { useState, ChangeEvent } from 'react';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';
import './ImageUploader.css';

const ImageUploader = () => {
  const [image, setImage] = useState<File| null>();
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event;
    let reader: FileReader = new FileReader();
    if(files && files.length) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      setImage(files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div>
      <Header showPublish={Boolean(image)} handleDataAction={removeImage} />
      {!image ?
        <div className="background-container">
          <label htmlFor="files" className="button-position">Upload</label>
          <input id="files" className="input-file" type="file" accept="image/*" onChange={handleChange} />
        </div>
        : <div className="background-container">
          <Editor imgData={image} imgUrl={imageUrl} />
        </div>
      }
    </div>
  )
};

export default ImageUploader;
