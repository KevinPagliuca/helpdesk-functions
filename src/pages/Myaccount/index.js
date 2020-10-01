import React, { useState } from 'react';
import Header from '../../components/Header';

import InputBlock from '../../components/InputBlock';

import accountSvg from '../../assets/account.svg';

import './myaccount.css';

const Myaccount = () => {
    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [dept, setDept] = useState(localStorage.getItem('dept'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [password, setPassword] = useState('');

    return (
        <div id="myaccount">
            <Header />
            <main className="container">
                <div className="userdata">
                    <h3>Meus dados</h3>
                    <form>
                        <InputBlock
                            id="name"
                            label="Nome Completo"
                            type="text"
                            readOnly
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <InputBlock
                            id="email"
                            label="Email"
                            type="email"
                            readOnly
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <InputBlock
                            id="dept"
                            label="Departamento"
                            type="text"
                            readOnly
                            value={dept}
                            onChange={e => setDept(e.target.value)}
                        />

                        <InputBlock
                            id="role"
                            label="Cargo"
                            type="text"
                            readOnly
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        />                        

                        <div className="button-container">
                            <button type="submit">Alterar Dados</button>
                        </div>

                    </form>
                </div>

                <div className="account-svg">
                    <img src={accountSvg} height={400} width={400} alt="" />
                </div>
            </main>
        </div>
    );
}

export default Myaccount;