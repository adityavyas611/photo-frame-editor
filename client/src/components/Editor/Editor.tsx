import React, { RefObject } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import './Editor.css';
import '../Toolbar/Toolbar.css';
import 'cropperjs/dist/cropper.css';

type Props = {
	imgData: any,
	imgUrl: string | ArrayBuffer | null,
	frame?: boolean,
	imageRef?: RefObject<HTMLImageElement>,
	frameRef?: RefObject<HTMLImageElement>,
	cropped?: boolean,
	handleToolbarClick?: (event: any) => void,
	cropping?: boolean,
	showFrame?: () => void
};

const Editor = ({ imgData, imgUrl, frame, imageRef, frameRef, cropped, handleToolbarClick, cropping, showFrame }: Props) => {
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

Editor.defaultProps = {
	frame: false,
	imageRef: null,
	frameRef: null,
	cropped: false,
	handleToolbarClick: () => null,
	cropping: false,
	showFrame: () => null
};

export default Editor;
