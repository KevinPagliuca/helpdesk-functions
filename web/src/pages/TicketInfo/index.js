import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegClock, FaPen } from 'react-icons/fa';

import Header from '../../components/Header';

import './ticketinfo.css';

import api from '../../services/api';
import ModalReply from './ModalReply';

const TicketInfo = () => {
    const [ticket, setTicket] = useState([]);
    const [replys, setReplys] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        api.get(`ticket/${id}`)
            .then((res => {
                setTicket(res.data[0]);
                setReplys(res.data[1]);
            })).catch((err) => {
                alert(err);
            })
    }, [id]);


    return (
        <div id="ticket-info">
            <ModalReply />
            <Header />
            <h3>Infomações do chamado de id: #{id}</h3>
            <div className="container">
                <div className="content-ticket">
                    <div className="header-ticket">
                        <strong>{ticket.subject}</strong>

                        <div className="icons">
                            <button className="btnEdit"><FaPen size={20} /></button>
                        </div>
                    </div>

                    <div className="informations">
                        <div className="assignTo">
                            <strong>Agente</strong>
                            <p>{ticket.assignTo}</p>
                        </div>
                        <div className="category">
                            <strong>Categoria</strong>
                            <p>{ticket.category}</p>
                        </div>
                        <div className="priority">
                            <strong>Prioridade</strong>
                            <p>{ticket.priority}</p>
                        </div>
                        <div className="dueDate">
                            <strong>Vencimento</strong>
                            <p>{ticket.duedate}</p>
                        </div>
                        <div className="status">
                            <strong>Status</strong>
                            <p>{ticket.status}</p>
                        </div>
                    </div>

                    <div className="description">
                        <strong>Descrição</strong>

                        <p>{ticket.description}</p>
                    </div>

                    <div className="actions">
                        <div className="btn-action">
                            <button>Responder</button>
                        </div>
                    </div>
                </div>
                {replys.map(reply => (
                    <div className="reply-container">
                        <div key={reply.id} className="reply-content">
                            <div className="reply-header">
                                <strong>{reply.user_reply}</strong>
                                <p><FaRegClock /> {reply.created_at}</p>
                            </div>

                            <div className="text">
                                <p>{reply.text}</p>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
}

export default TicketInfo;