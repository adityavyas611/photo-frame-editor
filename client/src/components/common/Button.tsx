import React from 'react';

type Props = {
	buttonName: string,
	className?: string
};

const Button = ({ buttonName, className }: Props) => (
	<input type="button" name={buttonName} value={buttonName} className={className} />
);

Button.defaultProps = {
	className: ''
};

export default Button;
