import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import InputBlock from '../../components/InputBlock';
import SelectBlock from '../../components/SelectBlock';
import TextAreaBlock from '../../components/TextareaBlock';

import api from '../../services/api';
import './newticket.css';

const NewTicket = () => {
    const id = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');

    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [duedate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();

    async function handleOpenNewTicket(e) {
        e.preventDefault();
        api.post('newticket', {
            subject,
            priority,
            category,
            assignTo,
            duedate,
            status,
            description
        }, {
            headers: {
                user_name: userName,
                user_email: email,
                user_id: id
            }
        }).then((res) => {
            alert('Chamado cadastrado com sucesso');
            history.push(`/ticket/${res.data.id}`);
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div id="newticket">
            <Header />
            <h3>Abrir novo chamado</h3>

            <div className="container">
                <div className="content-newticket">
                    <form className="form-newticket" onSubmit={handleOpenNewTicket}>
                        <InputBlock
                            id="subject"
                            label="Assunto"
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />

                        <InputBlock
                            id="duedate"
                            label="Vencimento"
                            type="date"
                            value={duedate}
                            onChange={e => setDueDate(e.target.value)}
                        />

                        <SelectBlock
                            id="assignTo"
                            label="Agente"
                            placeholder="Selecione um agente"

                            value={assignTo}
                            onChange={e => setAssignTo(e.target.value)}
                            options={
                                [
                                    {
                                        value: "Wanderley Santos",
                                    },
                                    {
                                        value: "Kevin Pagliuca"
                                    },
                                    {
                                        value: "André Oliveira"
                                    },
                                    {
                                        value: "Carlos Diogo"
                                    },
                                    {
                                        value: "Carla Garcia"
                                    }
                                ]
                            }
                        />

                        <SelectBlock
                            id="category"
                            label="Categoria"
                            placeholder="Selecione uma categoria"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            options={
                                [
                                    {
                                        value: "E-mail"
                                    },
                                    {
                                        value: "SAP"
                                    },
                                    {
                                        value: "Websites"
                                    },
                                    {
                                        value: "Office"
                                    },
                                    {
                                        value: "Computador"
                                    },
                                    {
                                        value: "Excel"
                                    },
                                    {
                                        value: "Outros"
                                    }
                                ]
                            }
                        />

                        <SelectBlock
                            id="priority"
                            label="Prioridade"
                            placeholder="Selecione uma prioridade"
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                            options={
                                [
                                    {
                                        value: "Baixa"
                                    },

                                    {
                                        value: "Média"
                                    },

                                    {
                                        value: "Alta"
                                    },

                                    {
                                        value: "Urgente"
                                    }
                                ]
                            }
                        />

                        <SelectBlock
                            id="status"
                            label="Status"
                            placeholder="Status desse chamado"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            options={
                                [
                                    {
                                        value: "Novo"
                                    },
                                    {
                                        value: "Em aberto"
                                    },
                                    {
                                        value: "Em progresso..."
                                    },
                                    {
                                        value: "Aguardando matriz/usuário"
                                    },
                                    {
                                        value: "Concluído"
                                    }
                                ]
                            }
                        />

                        <TextAreaBlock
                            id="description"
                            label="Descrição do chamado"
                            placeholder="Faça uma descrição detalhada."

                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <div className="button-container">
                            <button type="submit">Solicitar abertura</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTicket;