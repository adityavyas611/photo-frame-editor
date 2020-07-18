import React from 'react';
import './ImageUploader.css';

const ImageUploader = () => {
    return (
        <div className="background-container">
              <label for="files" class="button-position">Upload</label>
              <input id="files" className="input-file" type="file" />
        </div>
    )
};

export default ImageUploader;
