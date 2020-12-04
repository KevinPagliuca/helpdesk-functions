import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FaLock, FaUnlock } from 'react-icons/fa';

import Header from '../../components/Header';

import InputBlock from '../../components/InputBlock';
import accountSvg from '../../assets/account.svg';
import Dropzone from '../../components/Dropzone';

import './myaccount.css';

import api from '../../services/api';

const Myaccount = () => {
    const [name, setName] = useState(localStorage.getItem('user_name'));
    const [email, setEmail] = useState(localStorage.getItem('user_email'));
    const [dept, setDept] = useState(localStorage.getItem('user_dept'));
    const [role, setRole] = useState(localStorage.getItem('user_role'));
    const id = localStorage.getItem('user_id');
    const session = sessionStorage.getItem('status');
    const [SelectedFile, setSelectedFile] = useState([]);

    const [formData, setFormData] = useState({
        name: name,
        email: email,
        dept: dept,
        role: role
    });

    useEffect(() => {
        setFormData({
            name: name,
            email: email,
            dept: dept,
            role: role
        });
    }, [name, email, dept, role]);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)
        const { name, email, dept, role } = formData;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('dept', dept);
        data.append('role', role);

        if (SelectedFile) {
            data.append('avatar', SelectedFile);
            data.append('user_id', name);
        }

        await api.put('updateUser', data, {
            headers: {
                user_id: id
            }
        }).then((res) => {

                alert('Sucesso ' + res);
            }).catch((err) => {
                alert(err);
            });
    }


    if (session) {
        return (
            <div id="myaccount">
                <Header />
                <main className="container">
                    <div className="userdata">
                        <h3>Minha conta</h3>
                        <form onSubmit={handleSubmit}>
                            <Dropzone onFileUploaded={setSelectedFile} />

                            <InputBlock
                                id="name"
                                name="name"
                                label="Nome Completo"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                            <InputBlock
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <InputBlock
                                id="dept"
                                name="dept"
                                label="Departamento"
                                type="text"
                                value={dept}
                                onChange={e => setDept(e.target.value)}
                                required
                            />

                            <InputBlock
                                id="role"
                                name="role"
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