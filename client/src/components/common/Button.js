import React from 'react';

const Button = ({buttonName, className}) => (
        <input type="button" name={buttonName} value={buttonName} className={className}/>
);

export default Button;
