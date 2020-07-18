import React from 'react';

const Button = ({buttonName}) => (
    <div>
        <input type="button" name={buttonName} value={buttonName}/>
    </div>
);

export default Button;
