import React from 'react';

import './admin.css';

import Header from '../../components/Header';
import { Redirect } from 'react-router-dom';

const Admin = () => {

    const Admin = sessionStorage.getItem('admin');

    if (Admin) {

        return (
            <div id="admin">
                <Header />

                <div className="container">
                    <main className="configuration">

                        <div className="menu-content">
                            <p>Cofigurações gerais</p>

                            <div className="menu">
                                <button>Criar grupos de administradores</button>
                                <button>Formulário de chamado</button>
                                <button>Agentes</button>
                                <button>Regras</button>
                            </div>
                        </div>

                        <div className="menu-content">
                            <p>Controle de usuários</p>

                            <div className="menu">
                                <button>Criar nova conta Padrão</button>
                                <button>Criar nova conta Administradora</button>
                                <button>Alterar usuários</button>
                                <button>Excluir usuários</button>
                            </div>

                        </div>

                        <div className="menu-content">
                            <p>Relatórios</p>

                            <div className="menu">
                                <button>Chamados atendidos neste mês</button>
                                <button>Total de chamados neste mês</button>
                                <button>Tendências</button>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        );
    } else {
        return (
            <Redirect to="/myaccount" />
        );
    }
}

export default Admin;