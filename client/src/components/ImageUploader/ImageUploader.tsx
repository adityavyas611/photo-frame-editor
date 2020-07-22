import React, { useState, ChangeEvent, useEffect, useRef, RefObject } from 'react';
import Cropper from 'cropperjs';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';
import './ImageUploader.css';
import { mergeImageRequest } from '../../apis/mergeImageRequest';

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>('');

  const [cropping, setCropping] = useState(false);
  const [cropped, setCropped] = useState(false);
  const [cropper, setCropper] = useState<Cropper>();
  const [frame, setFrame] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLImageElement>(null);

  const intitalizeCropper = (ref: RefObject<HTMLImageElement>) => {
    if (ref && ref.current) {
      const currentCropper = new Cropper(ref.current, {
        autoCrop: false,
        dragMode: 'move',
        background: false,
        minContainerWidth: 1000,
        minContainerHeight: 600,
        toggleDragModeOnDblclick: false,
        crop: ({ detail }) => {
          if (detail.width > 0 && detail.height > 0) {
            setCropping(true);
          }
        },
      });
      setCropper(currentCropper);
    }
  };

  const stopCropper = () => {
    if (cropper) {
      cropper.destroy();
    }
  };

  const cropImage = () => {
    if (cropping && cropper && imageRef && imageRef.current) {
      imageRef.current.src = cropper.getCroppedCanvas({}).toDataURL();
      setCropped(true);
      setCropping(false);
    }
    stopCropper();
  };

  const clearCrop = () => {
    if (cropper) {
      cropper.clear();
      setCropping(false);
    }
  };

  const showFrame = () => {
    setFrame(!frame);
  };

  const handleToolbarClick = (event: any) => {
    const { target } = event;
    const buttonAction = target.getAttribute('data-action');
    switch (buttonAction) {
      case 'move':
      case 'crop':
        cropper && cropper.setDragMode(buttonAction);
        break;
      case 'rotate-left':
        cropper && cropper.rotate(-90);
        break;
      case 'rotate-right':
        cropper && cropper.rotate(90);
        break;
      case 'scale':
        cropper && cropper.scale(-cropper.getData().scaleX, -cropper.getData().scaleY);
        break;
      case 'crop-tick':
        cropImage();
        break;
      case 'crop-cancel':
        clearCrop();
        break;
      default:
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event;
    let reader: FileReader = new FileReader();
    if (files && files.length) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      setImage(files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  const publishImage = async () => {
    if(imageRef && imageRef.current && frameRef && frameRef.current) {
      const editorImages = {userImage: imageRef.current.src, frameImage: frameRef.current.src};
      const resImage = await mergeImageRequest(editorImages);
      console.log(resImage);
    }
  };

  useEffect(() => {
    if (imageUrl && imageRef) {
      stopCropper();
      intitalizeCropper(imageRef);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (frame && frameRef) {
      stopCropper();
      intitalizeCropper(frameRef);
    }
  }, [frame]);

  return (
    <div>
      <Header showPublish={Boolean(image)} handleDataAction={removeImage} publishImage={publishImage} />
      {!image ?
        <div className="background-container">
          <label htmlFor="files" className="button-position">Upload</label>
          <input id="files" className="input-file" type="file" accept="image/*" onChange={handleChange} />
        </div>
        : <div className="background-container">
          <Editor 
          imgData={image} 
          imgUrl={imageUrl} 
          frame={frame} 
          imageRef={imageRef} 
          frameRef={frameRef} 
          cropped={cropped} 
          handleToolbarClick={handleToolbarClick} 
          cropping={cropping} 
          showFrame={showFrame} />
        </div>
      }
    </div>
  )
};

export default ImageUploader;
