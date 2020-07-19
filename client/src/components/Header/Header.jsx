import React from 'react';
import Button from '../common/Button';
import './Header.css';

const Header = ({ showPublish, handleDataAction }) => (
    <div className="header-container">
        <div className="title-container">
            <h3 className="header">Photon: A Picture Editing Tool</h3>
        </div>
        {showPublish ?
        <div className="button-container">
            <img className="header-button" data-action="remove" title="Remove" alt="Move" src="./images/trash.png" onClick={handleDataAction}/>
            <Button buttonName="Publish" className="publish-button"/>
        </div>
        : null}
    </div>
);

export default Header;
