import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import './Editor.css';

const Editor = ({imgData: {name}, imgUrl}) =>  {
    return (
        <div className="editor">
            <div className="editor-canvas">
                <img alt={name} src={imgUrl} className="uploaded-image" />
            </div>
            <Toolbar/>
        </div>
    );
};

export default Editor;