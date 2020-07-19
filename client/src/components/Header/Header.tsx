import React, { MouseEvent } from 'react';
import Button from '../common/Button';
import './Header.css';

type Props = {
	showPublish?: boolean,
	handleDataAction?: (e: MouseEvent<HTMLImageElement>) => void,
};

const Header = ({ showPublish, handleDataAction }: Props) => (
	<div className="header-container">
		<div className="title-container">
			<h3 className="header">Photon: A Picture Editing Tool</h3>
		</div>
		{showPublish ?
			<div className="button-container">
				<img className="header-button" data-action="remove" title="Remove" alt="Move" src="./images/trash.png" onClick={handleDataAction} />
				<Button buttonName="Publish" className="publish-button" />
			</div>
			: null}
	</div>
);

Header.defaultProps = {
	showPublish: false,
	handleDataAction: () => null,
};

export default Header;
