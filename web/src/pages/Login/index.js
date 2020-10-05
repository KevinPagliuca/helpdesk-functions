import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import InputBlock from '../../components/InputBlock';
import api from '../../services/api';

import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        await api.post('login', {
            email, password
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('dept', res.data.dept);
            if(res.data.permission !== "1") {
                history.push('/myaccount');
            } else {
                history.push('/admin');
            }
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div id="login">
            <form onSubmit={handleLogin}>
                <h3>Fazer Login</h3>

                <InputBlock
                    id="email"
                    type="text"
                    autoComplete="off"
                    label="E-mail"

                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <InputBlock
                    id="password"
                    type="password"
                    autoComplete="off"
                    label="Senha"

                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
               
                <div className="button-container">
                    <button type="submit">Entrar</button>
                </div>

                <div className="more-infos">
                    <p>Ainda não tem conta ? </p>
                    <Link to="register">Cadastrar-se</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;