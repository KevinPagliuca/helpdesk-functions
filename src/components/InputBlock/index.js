import React from 'react';

import './input.css';

const InputBlock = ({id, label, type, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} {...rest} />
        </div>
    );
}

export default InputBlock;