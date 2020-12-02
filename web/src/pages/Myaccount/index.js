import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FaLock, FaUnlock } from 'react-icons/fa';

import Header from '../../components/Header';

import InputBlock from '../../components/InputBlock';
import accountSvg from '../../assets/account.svg';
import Dropzone from '../../components/Dropzone';

import './myaccount.css';

const Myaccount = () => {
    const [name, setName] = useState(localStorage.getItem('user_name'));
    const [email, setEmail] = useState(localStorage.getItem('user_email'));
    const [dept, setDept] = useState(localStorage.getItem('user_dept'));
    const [role, setRole] = useState(localStorage.getItem('user_role'));

    const [SelectedFile, setSelectedFile] = useState([]);

    const session = sessionStorage.getItem('status');

    if (session) {
        return (
            <div id="myaccount">
                <Header />
                <main className="container">
                    <div className="userdata">
                        <h3>Minha conta</h3>
                        <form>
                        <Dropzone onFileUploaded={setSelectedFile} />

                            <InputBlock
                                id="name"
                                label="Nome Completo"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <InputBlock
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <InputBlock
                                id="dept"
                                label="Departamento"
                                type="text"
                                value={dept}
                                onChange={e => setDept(e.target.value)}
                                required
                            />

                            <InputBlock
                                id="role"
                                label="Cargo"
                                type="text"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                required
                            />

                            <div className="button-container">
                                {name === localStorage.getItem('user_name')
                                &&
                                email === localStorage.getItem('user_email')
                                &&
                                dept === localStorage.getItem('user_dept')
                                &&
                                role === localStorage.getItem('user_role')
                                ?
                                    <button type="submit" disabled><FaLock size={22} />Salvar</button>
                                    :
                                    <button type="submit"><FaUnlock size={22} />Salvar</button>
                                }
                            </div>

                        </form>
                    </div>

                    <div className="account-svg">
                        <img src={accountSvg} alt="accountSvg" />
                    </div>
                </main>
            </div>
        );
    } else {
        return <Redirect to="/" />
    }
}
export default Myaccount;