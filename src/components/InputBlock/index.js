import React from 'react';

import './input.css';

const InputBlock = ({ id, label, type, value, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} value={value} {...rest} />
        </div>
    );
}

export default InputBlock;