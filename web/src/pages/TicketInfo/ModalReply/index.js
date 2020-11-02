import React from 'react';

import TextareaBlock from '../../../components/TextareaBlock';

import './modalreply.css';

const ModalReply = (props) => {


    return (
        <>
            <div id="backdrop" style={props.click === true ? { display: "block" } : null} onClick={props.visibility} />

            <div className={props.click === true ? "modal-container translate" : "modal-container"}>
                <div className="modal-content">
                    <TextareaBlock />
                </div>
            </div>
        </>
    );
}

export default ModalReply;