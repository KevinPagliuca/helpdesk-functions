import React from 'react';

import InputBlock from '../../../components/InputBlock';

import './modalreply.css';

const ModalReply = (props) => {

    function closeModal(e) {
        e.preventDefault();        
        if(props.click === true) {
             return props.visibility;
        }
    }
   

    return (
        <div id="backdrop" style={props.click === true ? { display: "block" } : null} onClick={closeModal}>
            
            <div className="modal-container">
                <div className="modal-content">
                    <InputBlock />
                </div>
            </div>
            
        </div>
    );
}

export default ModalReply;