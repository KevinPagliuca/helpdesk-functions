import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import TicketItem from '../../components/TicketItem';
import MyTicketsImg from '../../assets/mytickets.svg';

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
            <h3>Todos os chamados</h3>
            <div className="container">

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
                            <h4>Não temos nenhum chamado cadastrado no nosso sistema, Seja
                            o primeiro!! <br /><Link to="newticket">Clique Aqui para começar!</Link>
                                <br />
                             <p style={{color: 'rgb(0, 153, 255)'}}>#bethefirst</p>
                            </h4>
                        </div>
                    }
                </div>
                {/* 
                <div className="tickets-svg">
                    <img src={MyTicketsImg} alt="mytickets-svg" width={350} />
                </div> */}

            </div>
        </div>
    );
}

export default AllTickets;