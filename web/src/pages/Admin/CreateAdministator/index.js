import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../../../components/Header';
import InputBlock from '../../../components/InputBlock';
import SelectBlock from '../../../components/SelectBlock';

import './createadministator.css';

import api from '../../../services/api';

const CreateAdministrator = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dept, setDept] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    const Admin = sessionStorage.getItem('admin');

    async function handleCreateUser(e) {
        e.preventDefault();
        api.post('register/admin', {
            name,
            email,
            dept,
            role,
            password
        }).then(res => {
            alert('Cadastrado com sucesso!');
        }).catch(err => {
            alert('Falha no cadastro, email já existente!');
        });
    }

    if (Admin) {
        return (
            <div id="createAdministrator">
                <Header />
                <div className="container">
                    <form onSubmit={handleCreateUser}>
                        <h3>Preencha o formulário abaixo para realizar a criação do usuário Admistrador do sistema.</h3>

                        <InputBlock
                            id="name"
                            label="Nome Completo"
                            type="text"

                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete="off"
                        />

                        <InputBlock
                            id="email"
                            label="Email"
                            type="email"

                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                        />

                        <div className="dualInput">
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
                                autoComplete="off"
                            />

                            <InputBlock
                                id="role"
                                label="Cargo"
                                type="text"

                                value={role}
                                onChange={e => setRole(e.target.value)}
                                required
                                autoComplete="off"
                            />
                        </div>

                        <InputBlock
                            id="password"
                            label="Senha"
                            type="password"

                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="off"
                        />

                        <div className="button-container" >
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <Redirect to="/myaccount" />
        );
    }
}

export default CreateAdministrator;