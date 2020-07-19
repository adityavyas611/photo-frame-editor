import React from 'react';
import './Toolbar.css';

const Toolbar = () => {
    return (
        <div className="toolbar">
            <img className="toolbar-button" data-action="move" title="Move" alt="Move" src="./images/move.png" />
            <img className="toolbar-button" data-action="crop" title="Crop" alt="Crop" src="./images/crop.png"/>
            <img className="toolbar-button" data-action="rotate-left" title="Rotate Left" alt="RotateLeft" src="./images/rotate-left.png" />
            <img className="toolbar-button" data-action="rotate-right" title="Rotate Rigt" alt="RotateRight" src="./images/rotate-right.png" />
            <img className="toolbar-button" data-action="scale" title="Scale" alt="Scale" src="./images/scale.png" />
        </div>
    )
};

export default Toolbar;