import React from 'react';

import './select.css';

const SelectBlock = ({label, id, placeholder, options, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={id}>{label}</label>
            <select id={id} {...rest}>   

                <option value="" disabled hidden>{placeholder}</option>

                {options.map(option => (
                    <option key={option.name} value={option.name}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectBlock;