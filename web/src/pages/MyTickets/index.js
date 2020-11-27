import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import TicketItem from '../../components/TicketItem';

import api from '../../services/api';
import './mytickets.css';

const MyTickets = () => {
  const [listTickets, setLisTickets] = useState([]);

  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    async function LoadTickets() {
      const resp = await api.get('mytickets', {
        headers: {
          user_id
        }
      });
      setLisTickets(resp.data);
    }
    LoadTickets();
  }, [user_id]);


  return (
    <div id="mytickets">
      <Header />
      <div className="container">

        <h3>Meus chamados em aberto...</h3>
        <div className="tickets">
          {listTickets.length !== 0
            ?
            listTickets.map(ticket => (
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
              <h4>Você não tem nenhum chamado cadastrado para
              ser listado.
                  <br />
                <Link to="newticket">Clique Aqui</Link> para começar!
              </h4>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default MyTickets;