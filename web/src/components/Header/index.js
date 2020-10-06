import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import userImg from '../../assets/user.png';

import './header.css';

const Header = () => {
    
    return (
        <header id="header">
            <nav className="navbar">
                <div className="logo">
                    <img src={logoImg} alt="teste" />
                </div>

                <div className="nav-container">
                    <ul>                  
                        <li><Link to="/newticket">Dashboard</Link></li>
                        <li><Link to="/newticket">Novo chamado</Link></li>
                        <li><Link to="/mytickets">Meus chamados</Link></li>
                        <li><Link to="/alltickets">Todos os chamados</Link></li>
                    </ul>


                    <div className="dropdown">
                        <img src={userImg} alt="userImg" />
                        <div id="myDropdown" className="dropdown-content">
                            <Link to="/myaccount">Minha conta</Link>
                            <Link to="/suggest">Sugestões</Link>
                            <Link to="/faq">Ajuda</Link>
                            <Link to="/logout">Sair</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;