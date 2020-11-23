import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import TicketItem from '../../components/TicketItem';

import api from '../../services/api';

import './completedTickets.css';

const ClosedTickets = () => {
    const [closedTickets, setClosedTickets] = useState([]);

    useEffect(() => {
        async function ClosedTicketsList() {
            const res = await api.get('closedtickets');
            setClosedTickets(res.data);
        }
        ClosedTicketsList();
    })
    return (
        <div id="completedTickets">
            <Header />
            <div className="container">
                <h3>Aqui estão todos os chamados já concluídos...</h3>

                <div className="tickets">
                    {closedTickets.length !== 0
                        ?
                        closedTickets.map(ticket => (
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
                            <h4>Não temos nenhum chamado cadastrado no nosso sistema, Seja
                            o primeiro!! <br /><Link to="newticket">Clique Aqui para começar!</Link>
                                <br />
                                <p style={{ color: 'rgb(0, 153, 255)' }}>#bethefirst</p>
                            </h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ClosedTickets;