import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import TicketItem from '../../components/TicketItem';

import api from '../../services/api';

import './completedTickets.css';

const ClosedTickets = () => {
    const [tickets, setTickets] = useState([]);


    useEffect(() => {
        async function completedTicketList() {
            const res = await api.get('alltickets');
            setTickets(res.data);
        }
        completedTicketList();
    }, []);

    return (
        <div id="completedTickets">
            <Header />
            <div className="container">
                <h3>Aqui estão todos os chamados já concluídos...</h3>

                <div className="tickets">
                    {tickets.length !== 0
                        ?
                        tickets.map(ticket => (
                            <TicketItem
                                key={ticket.id}
                                id={ticket.id}
                                subject={ticket.subject}
                                assignTo={ticket.assignTo}
                                duedate={ticket.duedate}
                                priority={ticket.priority}
                                category={ticket.category}
                                status={ticket.status}
                                close="closedTicket"
                            />
                        ))
                        :
                        <div className="error-ticket">
                            <h4>Não temos nenhum chamado concluído ainda.
                            <br /><Link to="myaccount">Clique aqui para voltar ao início</Link>
                                <br />
                            </h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ClosedTickets;