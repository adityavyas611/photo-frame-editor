import React, { useState, useEffect, useRef } from 'react';
import Cropper from 'cropperjs';
import Toolbar from '../Toolbar/Toolbar';
import './Editor.css';
import 'cropperjs/dist/cropper.css';

type Props = {
	imgData: any,
	imgUrl: string | ArrayBuffer | null,
};

const Editor = ({ imgData, imgUrl }: Props) => {
	const [cropping, setCropping] = useState(false);
	const [cropped, setCropped] = useState(false);
	const [cropper, setCropper] = useState<Cropper>();

	const imageRef = useRef<HTMLImageElement>(null);

	const intitalizeCropper = () => {
		if (imageRef.current) {
			const currentCropper = new Cropper(imageRef.current, {
				autoCrop: false,
				dragMode: 'move',
				background: false,
				minContainerWidth: 1000,
				minContainerHeight: 600,
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
			imageRef.current.src = cropper.getCroppedCanvas().toDataURL();
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
	}

	useEffect(() => {
		if (imgUrl) {
			intitalizeCropper();
		}
	}, [imgUrl]);

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
	const { name } = imgData;
	return (
		<div className="editor">
			<div className="editor-canvas">
				<img alt={name} src={imgUrl ? String(imgUrl) : ''} className="uploaded-image" ref={imageRef} />
			</div>
			{!cropped ? <Toolbar handleDataAction={handleToolbarClick} isCropping={cropping} /> : null}
		</div>
	);
};

export default Editor;