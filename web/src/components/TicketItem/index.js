import React from 'react';
import { Link } from 'react-router-dom';

import { FaTrash } from 'react-icons/fa';

import './ticket.css';


const TicketItem = (props) => {
    return (
        <Link className={props.close ? "closedTicket content" : "content"} to={`ticket/${props.id}`}>
            <div className="subject">
                <strong>{props.subject}</strong>
                <div className="options">
                    <FaTrash size={18} />
                </div>
            </div>

            <div className="info">
                <div>
                    <strong>Assinado para</strong>
                    <p>{props.assignTo}</p>
                </div>

                <div>
                    <strong>Vencimento</strong>
                    <p>{props.duedate}</p>
                </div>

                <div>
                    <strong>Prioridade</strong>
                    <p>{props.priority}</p>
                </div>

                <div>
                    <strong>Categoria</strong>
                    <p>{props.category}</p>
                </div>

                <div>
                    <strong>Status</strong>
                    <p>{props.status}</p>
                </div>
            </div>
        </Link>
    );
}

export default TicketItem;