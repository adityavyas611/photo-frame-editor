import React, {MouseEvent} from 'react';

type Props = {
	buttonName: string,
	className?: string,
	handleClick?: (event: MouseEvent<HTMLInputElement>) => void
};

const Button = ({ buttonName, className, handleClick }: Props) => (
	<input type="button" name={buttonName} value={buttonName} className={className} onClick={handleClick} />
);

Button.defaultProps = {
	className: '',
	handleClick: () => null
};

export default Button;
