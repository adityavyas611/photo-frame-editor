import React, { useState, ChangeEvent, useEffect, useRef, RefObject } from 'react';
import Cropper from 'cropperjs';
import Header from '../Header/Header';
import Editor from '../Editor/Editor';
import './ImageUploader.css';
import { mergeImageRequest } from '../../apis/mergeImageRequest';

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null); // to set the uploaded image
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(''); // to set the url of the image

  const [cropping, setCropping] = useState(false); // to set the cropping when user select crop option
  const [cropped, setCropped] = useState(false); // to set value when user completes cropping operation
  const [cropper, setCropper] = useState<Cropper>(); // to create cropper for the image element
  const [frame, setFrame] = useState(false); // to render frame on the screen

  const imageRef = useRef<HTMLImageElement>(null); // Reference to the uploaded image
  const frameRef = useRef<HTMLImageElement>(null); // Reference to the frame image

  const intitalizeCropper = (ref: RefObject<HTMLImageElement>) => {
    if (ref && ref.current) {

      // creating cropper 
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

  /**
   * @description -  To Destroy the croppper once all operation are performed
   */
  const stopCropper = () => {
    if (cropper) {
      cropper.destroy();
    }
  };
   /**
   * @description -  To set the state when user performs cropping operation
   */
  const cropImage = () => {
    if (cropping && cropper && imageRef && imageRef.current) {
      imageRef.current.src = cropper.getCroppedCanvas().toDataURL();
      setCropped(true);
      setCropping(false);
    }
    stopCropper();
  };

   /**
   * @description -  To Remove the croppper from cropping state, when user completes
   *                 cropping image
   */
  const clearCrop = () => {
    if (cropper) {
      cropper.clear();
      setCropping(false);
    }
  };
  
  /**
   * @description -  To render frame onScreen
   */
  const showFrame = () => {
    setFrame(!frame);
  };

  /**
   * @description - The function to get data-action from the image and perform operation in the
   *                cropper.
   * @param event - To handle the clicks by user in the toolbar and perform action based on event
   */
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

  /**
   * @description - To handle the change in file upload element
   * @param event - To handle the file upload operation, reading file using Filereader class
   */
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

  /**
   * @description - To remove the image from the editor and reset the application
   */
  const removeImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  /**
   * @description - To handle the publish action and send images for merge and download the merged image.
   */
  const publishImage = async () => {
    if(imageRef && imageRef.current && frameRef && frameRef.current) {
      const editorImages = {userImage: imageRef.current.src, frameImage: frameRef.current.src};
      const resImage = await mergeImageRequest(editorImages);
      if(resImage.data) {
        // setting the data to data:application/octet-steam to directly download the base64 encoded file
        const downloadImage = resImage.data.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        window.open(downloadImage);
      }
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
