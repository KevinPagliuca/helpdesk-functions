import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header';

import './ticketinfo.css';

import api from '../../services/api';

const TicketInfo = () => {
    const [ticket, setTicket] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        api.get(`ticket/${id}`)
            .then((res => {
                setTicket(res.data[0]);
            })).catch((err) => {
                alert(err)
            })
    }, [id]);

   
    return (
        <div id="ticket-info">
            <Header />
            <h3>Infomações do chamado de id: #{id}</h3>
            <div className="container">
                <div className="content-ticket">
                    <div className="header-ticket">
                        <h4>{ticket.subject}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketInfo;