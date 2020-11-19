import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import TextareaBlock from '../../../components/TextareaBlock';

import './modalreply.css';

import api from '../../../services/api';

const ModalReply = (props) => {
    const [text, setText] = useState('');
    const { id } = useParams();

    const user_name = localStorage.getItem('user_name');
    const user_id_reply = localStorage.getItem('user_id');

    async function handleSendComment(e) {
        e.preventDefault();
         await api.post(`/ticket/${id}`, {
             text
         }, {
             headers: {
                 user_name,
                 user_id_reply
             }
         }).then((res) => {
             alert('Comentário enviado!!');                                 
         }).catch((err) => {
             alert('erro ' + err);
         });     
         setText('');     
         props.enviar(true);
         
    }    

    return (
        <>
            <div id="backdrop" style={props.click === true ? { display: "block" } : null} onClick={props.visibility} />

            <div id="my-modal" className={props.click === true ? "modal-container translate" : "modal-container"}>
                <div className="modal-content">
                    <form onSubmit={handleSendComment}>
                        <section>
                            <TextareaBlock
                                label="Deixe seu comentário abaixo"
                                id="reply-text"
                                placeholder="Insira seu texto aqui"

                                onChange={e => setText(e.target.value)}
                                value={text}
                            />
                            <div className="button-container">
                                <button type="submit">Enviar</button>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ModalReply;