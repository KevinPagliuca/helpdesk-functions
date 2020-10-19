import React from 'react';

import './textarea.css';

const TextAreaBlock = (props) => {

    function handleAutoSizeTextarea(e) {
        var height = e.target.scrollHeight;
        e.target.style.height = 'auto';
        e.target.style.height = `${height}px`;    
    }

   

    return (
        <div className="textarea-block">
            <label>{props.label}</label>
            <textarea
                id={props.id}
                onKeyDown={handleAutoSizeTextarea}
                placeholder={props.placeholder}
                {...props}
            >

            </textarea>
        </div>
    );
}

export default TextAreaBlock;