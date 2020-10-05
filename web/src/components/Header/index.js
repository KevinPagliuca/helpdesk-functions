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
                        <li><Link to="/myaccount">Novo chamado</Link></li>
                        <li><Link to="/myaccount">Meus chamados</Link></li>
                        <li><Link to="/myaccount">Chamados em aberto</Link></li>
                    </ul>


                    <div className="dropdown">
                        <img src={userImg} alt="userImg" />
                        <div id="myDropdown" className="dropdown-content">
                            <Link to="">Minha conta</Link>
                            <Link to="">Sugestões</Link>
                            <Link to="">Ajuda</Link>
                            <Link to="/logout">Sair</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;