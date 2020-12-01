import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import InputBlock from '../../components/InputBlock';
import SelectBlock from '../../components/SelectBlock';

import api from '../../services/api';
import './register.css';

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dept, setDept] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(e) {
        e.preventDefault();
        api.post('register', {
            name,
            email,
            dept,
            role,
            password
        }).then(() => {
            alert('Cadastrado com sucesso!!');
            history.push('/');
        }).catch(() => {
            alert('E-mail já existente no nosso sistema, tente outro endereço!');
        });
    }

    return (
        <div id="register">
            <form onSubmit={handleRegister}>
                <h3>Fazer cadastro</h3>
                <InputBlock
                    id="name"
                    type="text"
                    autoComplete="off"
                    label="Nome Completo"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <InputBlock
                    id="email"
                    type="email"
                    autoComplete="off"
                    label="E-mail"

                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <SelectBlock
                    id="departamento"
                    label="Departamento"
                    placeholder="Selecione um departamento"
                    options={[
                        { name: 'Administração' },
                        { name: 'Adm. de Vendas' },
                        { name: 'Fiscal' },
                        { name: 'Key Account' },
                        { name: 'Marketing I' },
                        { name: 'Marketing II' },
                        { name: 'Marketing III' },
                        { name: 'Marketing IV' },
                        { name: 'Marketing V' },
                        { name: 'Recursos Humanos' },
                        { name: 'SCM' },
                        { name: 'Tecnologia' },
                        { name: 'Vendas' },
                    ]}

                    value={dept}
                    onChange={e => setDept(e.target.value)}
                    required
                />

                <InputBlock
                    id="cargo"
                    type="text"
                    autoComplete="fff"
                    label="Cargo"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                />

                <InputBlock
                    id="password"
                    type="password"
                    autoComplete="off"
                    label="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required                    
                />

                <div className="button-container" >
                    <button type="submit">Cadastrar</button>
                </div>

                <div className="more-infos">
                    <p>Já tenho uma conta!</p>
                    <Link to="/">Ir para Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;