import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import Header from '../../components/Header';

import './admin.css';

const Admin = () => {

    const Admin = sessionStorage.getItem('admin');

    if (Admin) {

        return (
            <div id="admin">
                <Header />

                <div className="container">
                    <main className="configuration">

                        {/* <div className="menu-content">
                            <p>Cofigurações gerais</p>

                            <div className="menu">
                                <button>Criar grupos de administradores</button>
                                <button>Formulário de chamado</button>
                                <button>Agentes</button>
                                <button>Regras</button>
                            </div>
                        </div> */}

                        <div className="menu-content">
                            <p>Controle de usuários</p>

                            <div className="menu">
                                <Link to="admin/createAccount">Criar nova conta Padrão</Link>
                                <Link to="admin/createAdministrator" >Criar nova conta Administradora</Link>
                                <Link to="admin/Users" >Usuários</Link>
                            </div>

                        </div>

                        <div className="menu-content">
                            <p>Relatórios</p>

                            <div className="menu">
                                <Link to="/reports">Chamados atendidos neste mês</Link>
                                <Link to="/reports">Total de chamados neste mês</Link>
                                <Link to="/reports">Tendências</Link>
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