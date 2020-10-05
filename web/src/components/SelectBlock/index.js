import React from 'react';

import './select.css';

const SelectBlock = ({label, id, placheholder, options, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={id}>{label}</label>
            <select id={id} {...rest}>   

                <option disabled hidden>{placheholder}</option>

                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.value}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectBlock;