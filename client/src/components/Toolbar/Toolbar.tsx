import React, { MouseEvent } from 'react';
import './Toolbar.css';

type Props = {
	handleDataAction?: (e: MouseEvent<HTMLImageElement>) => void,
	isCropping?: boolean,
};

const Toolbar = ({ handleDataAction, isCropping }: Props) => {
	return (
		<div className="toolbar">
			{!isCropping ?
				<>
					<img className="toolbar-button" data-action="move" title="Move" alt="Move" src="./images/move.png" onClick={handleDataAction} />
					<img className="toolbar-button" data-action="crop" title="Crop" alt="Crop" src="./images/crop.png" onClick={handleDataAction} />
					<img className="toolbar-button" data-action="rotate-left" title="Rotate Left" alt="RotateLeft" src="./images/rotate-left.png" onClick={handleDataAction} />
					<img className="toolbar-button" data-action="rotate-right" title="Rotate Rigt" alt="RotateRight" src="./images/rotate-right.png" onClick={handleDataAction} />
					<img className="toolbar-button" data-action="scale" title="Scale" alt="Scale" src="./images/scale.png" onClick={handleDataAction} />
				</>
				:
				<>
					<img className="toolbar-button" data-action="crop-tick" title="Done" alt="Crop" src="./images/tick.png" onClick={handleDataAction} />
					<img className="toolbar-button" data-action="crop-cancel" title="Cancel" alt="Cancel" src="./images/ban.png" onClick={handleDataAction} />
				</>
			}
		</div>
	)
};

Toolbar.defaultProps = {
	handleDataAction: () => null,
	isCropping: false
};

export default Toolbar;