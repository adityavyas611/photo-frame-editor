import React from 'react';
import Button from '../common/Button';
import './Header.css';

const Header = ({ showPublish }) => (
    <div className="header-container">
        <h3 className="header">Photon: A Photo Editing Tool</h3>
        {showPublish ? <Button buttonName="Publish" className="publish-button" />  : null}
    </div>
);

export default Header;
