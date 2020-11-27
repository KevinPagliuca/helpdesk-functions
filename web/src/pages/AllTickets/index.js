import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import TicketItem from '../../components/TicketItem';

import './alltickets.css';
import api from '../../services/api';

const AllTickets = (props) => {
    const [tickets, setTickets] = useState([]);


    useEffect(() => {
        async function AllTicketsList() {
            const res = await api.get('alltickets');
            setTickets(res.data);
        }
        AllTicketsList();
    }, [])

    return (
        <div id="alltickets">
            <Header />
            <div className="container">
                <h3>Aqui estão todos os chamados em aberto...</h3>

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
                            />
                        ))
                        :
                        <div className="error-ticket">
                            <h4>Não temos nenhum chamado em andamento no nosso sistema.
                                <br /><Link to="newticket">Clique Aqui para solicitar a abertura de um chamado.</Link>
                            </h4>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default AllTickets;