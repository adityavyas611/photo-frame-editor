import React, { useState, useEffect, useRef, RefObject } from 'react';
import Cropper from 'cropperjs';
import Toolbar from '../Toolbar/Toolbar';
import './Editor.css';
import '../Toolbar/Toolbar.css';
import 'cropperjs/dist/cropper.css';

type Props = {
	imgData: any,
	imgUrl: string | ArrayBuffer | null,
};

const Editor = ({ imgData, imgUrl }: Props) => {
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

	useEffect(() => {
		if (imgUrl && imageRef) {
			stopCropper();
			intitalizeCropper(imageRef);
		}
	}, [imgUrl]);

	useEffect(() => {
		if (frame && frameRef) {
			stopCropper();
			intitalizeCropper(frameRef);
		}
	}, [frame]);

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
					<img alt={name} src={imgUrl ? String(imgUrl) : ''} className={frame ? "frame-image" : "uploaded-image"} ref={imageRef} />
					{frame ? <img alt="frame" src="./images/goldframe.png" ref={frameRef} className="image-frame" /> : null}
			</div>
			{!cropped ? <Toolbar handleDataAction={handleToolbarClick} isCropping={cropping} />
				: <div className="toolbar">
					<img className="toolbar-button" src="./images/frame.png" alt="Select Frame" title="Select Frame" onClick={showFrame} />
				</div>}
		</div>
	);
};

export default Editor;
