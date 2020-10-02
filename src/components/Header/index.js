import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import userImg from '../../assets/user.png';

import './header.css';

const Header = () => {

    function handleShowDropDown(e) {
        e.preventDefault();
        
        document.getElementById('myDropdown').className('dropdown-content', 'show');
    }
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


                    <div className="dropdown">
                        <img src={userImg} alt="userImg" />
                        <div id="myDropdown" className="dropdown-content">
                            <Link to="">Home</Link>
                            <Link to="">About</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;