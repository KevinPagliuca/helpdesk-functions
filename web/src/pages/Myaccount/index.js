import React, { useState } from 'react';

import Header from '../../components/Header';
import { FaLock } from 'react-icons/fa';

import InputBlock from '../../components/InputBlock';
import accountSvg from '../../assets/account.svg';
import AvatarImg from '../../components/Styles/Avatar';

import './myaccount.css';
import { Redirect } from 'react-router-dom';


const Myaccount = () => {
    const [name, setName] = useState(localStorage.getItem('user_name'));
    const [email, setEmail] = useState(localStorage.getItem('user_email'));
    const [dept, setDept] = useState(localStorage.getItem('user_dept'));
    const [role, setRole] = useState(localStorage.getItem('user_role'));

    const session = sessionStorage.getItem('status');

    if (session) {
        return (
            <div id="myaccount">
                <Header />
                <h3>Minha conta</h3>
                <main className="container">
                    <div className="userdata">
                        <form>
                            <AvatarImg />

                            <InputBlock
                                id="name"
                                label="Nome Completo"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <InputBlock
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <InputBlock
                                id="dept"
                                label="Departamento"
                                type="text"
                                value={dept}
                                onChange={e => setDept(e.target.value)}
                            />

                            <InputBlock
                                id="role"
                                label="Cargo"
                                type="text"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            />

                            <div className="button-container">
                                <button type="submit">
                                    <FaLock size={22} />
                                Salvar
                            </button>
                            </div>

                        </form>
                    </div>

                    <div className="account-svg">
                        <img src={accountSvg} height={530} width={500} alt="accountSvg" />
                    </div>
                </main>
            </div>
        );
    } else {
        return <Redirect to="/" />
    }
}
export default Myaccount;