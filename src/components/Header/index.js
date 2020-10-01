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
                        {/* <li><Link to="/myaccount">Minha conta</Link></li> */}
                        <li><Link to="/myaccount">Meus chamados</Link></li>
                        <li><Link to="/myaccount">Chamados em aberto</Link></li>
                    </ul>

                    <div className="user-content">
                        <img src={userImg} alt="userimg" />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;