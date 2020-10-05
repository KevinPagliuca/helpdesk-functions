import React from 'react';
import { FaTrash } from 'react-icons/fa';

import Header from '../../components/Header';

import MyTicketsImg from '../../assets/mytickets.svg';

import './mytickets.css';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  return (
    <div id="mytickets">
      <Header />
      <h3>Meus chamados</h3>

      <div className="container">

        <div className="tickets-svg">
          <img src={MyTicketsImg} alt="mytickets-svg" width={350} />
        </div>

        <div className="tickets">
          
          <Link className="content" to="/mytickets">
            <div className="subject">
              <strong>Alteração na tableta de quota ZSDFORECASTEX</strong>
              <div className="options">
                <FaTrash color={'#ff0000'} size={18} />
              </div>
            </div>

            <div className="info">
              <div>
                <strong>Assinado para</strong>
                <p>Kevin Pagliuca</p>
              </div>

              <div>
                <strong>Vencimento</strong>
                <p>13/10/1999</p>
              </div>

              <div>
                <strong>Prioridade</strong>
                <p>Alta</p>
              </div>

              <div>
                <strong>Status</strong>
                <p>Em progresso...</p>
              </div>

              <div>
                <strong>Categoria</strong>
                <p>E-mail</p>
              </div>

            </div>
          </Link>
       
        </div>
      </div>
    </div>
  );
}
export default MyTickets;