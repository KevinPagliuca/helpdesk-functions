import React, { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegClock, FaPen, FaSave, FaTimesCircle, FaCommentDots } from 'react-icons/fa';

import Header from '../../components/Header';

import './ticketinfo.css';

import api from '../../services/api';
import ModalReply from './ModalReply';

const TicketInfo = () => {
    const [ticket, setTicket] = useState([]);
    const [replys, setReplys] = useState([]);
    const [userEdit, setUserEdit] = useState(false);
    const [agents, setAgents] = useState([]);

    const [tmpSubject, setTmpSubject] = useState('');
    const [tmpAssignTo, setTmpAssignTo] = useState('');
    const [tmpCategory, setTmpCategory] = useState('');
    const [tmpPriority, setTmpPriority] = useState('');
    const [tmpDuedate, setTmpDueDate] = useState('');
    const [tmpItEstimated, setTmpItEstimated] = useState('');
    const [tmpDescription, setTmpDescription] = useState('');
    const [tmpStatus, setTmpStatus] = useState('');

    const [isClicked, setIsClicked] = useState(false);
    const { id } = useParams();

    const user_id = localStorage.getItem('user_id');
    const admin = sessionStorage.getItem('admin');

    useEffect(() => {
        api.get(`ticket/${id}`)
            .then((res => {
                setTicket(res.data[0]);
                setReplys(res.data[1]);
            })).catch((err) => {
                alert(err);
            })
    }, [id, ticket]);

    async function handleSaveChanges(e) {
        e.preventDefault();

        await api.put(`/ticketEdit/${id}`, {
            subject: tmpSubject,
            assignTo: tmpAssignTo,
            category: tmpCategory,
            priority: tmpPriority,
            duedate: tmpDuedate,
            description: tmpDescription,
            status: tmpStatus,
            estimated: tmpItEstimated
        }, {
            headers: {
                user_id,
                admin
            }
        }).then((res) => {
            alert('Alterado com sucesso!')
        }).catch((err) => {
            alert('algo deu errado, verifique e tente novamente!' + (err))
        });
        setUserEdit(false);
    }

    useEffect(() => {
        setTmpSubject(localStorage.getItem('tmpSubject'));
        setTmpAssignTo(localStorage.getItem('tmpAssignTo'));
        setTmpPriority(localStorage.getItem('tmpPriority'));
        setTmpCategory(localStorage.getItem('tmpCategory'));
        setTmpDueDate(localStorage.getItem('tmpDueDate'));
        setTmpItEstimated(localStorage.getItem('tmpEstimated'));
        setTmpDescription(localStorage.getItem('tmpDescription'));
        setTmpStatus(localStorage.getItem('tmpStatus'));

        if (userEdit === true) {
            document.getElementById("description").classList.add('active');
        } else {
            document.getElementById("description").classList.remove('active');
        }
    }, [userEdit]);


    function handlTicketEdit(e) {
        e.preventDefault();
        setUserEdit(true);
        localStorage.setItem('tmpSubject', ticket.subject);
        localStorage.setItem('tmpAssignTo', ticket.assignTo);
        localStorage.setItem('tmpPriority', ticket.priority);
        localStorage.setItem('tmpCategory', ticket.category);
        localStorage.setItem('tmpDueDate', ticket.duedate);
        localStorage.setItem('tmpEstimated', ticket.estimated);
        localStorage.setItem('tmpDescription', ticket.description);
        localStorage.setItem('tmpStatus', ticket.status);
    }

    useEffect(() => {
        async function getAgents() {
            await api.get('agents')
                .then((res) => {
                    setAgents(res.data);
                }).catch((err) => {
                    alert(err);
                })
        }
        getAgents();
    }, [agents]);

    function handleModalAppear(e) {
        e.preventDefault();
        if (isClicked === false) {
            setIsClicked(true);
        } else {
            setIsClicked(false);
        }
    }

    function handleModalVisibility(e) {
        e.preventDefault();
        if (isClicked === true) {
            setIsClicked(false);
            document.getElementById('backdrop').style.display = "none";

        } else {
            setIsClicked(true);
            document.getElementById('backdrop').style.display = "block";
        }
    }

    function sendComment(send) {
        if (send === true) {
            setIsClicked(false);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        setUserEdit(false);
    } 

    return (
        <div id="ticket-info">
            <ModalReply click={isClicked} enviar={sendComment} visibility={handleModalVisibility} />
            <Header />
            <div className="container">
                <div className="content-ticket">
                    <div className="header-ticket">
                        {userEdit === false ?
                            <strong>{ticket.subject}</strong>
                            :
                            <input type="text" value={tmpSubject} onChange={e => setTmpSubject(e.target.value)} />

                        }
                        <div className="icons">
                            {Number(user_id) === ticket.user_id || admin === 'true' ?
                                <button className="btnEdit" onClick={handlTicketEdit}><FaPen size={20} /></button>
                                :
                                null
                            }
                        </div>

                    </div>

                    <div className="informations">
                        <div className="assignTo">
                            <strong>Agente</strong>
                            {userEdit === false ?
                                <p>{ticket.assignTo}</p>
                                :
                                <select
                                    value={tmpAssignTo}
                                    onChange={e => setTmpAssignTo(e.target.value)}
                                >
                                    {agents.map(agent => (
                                        <option key={agent.id} value={agent.name}>{agent.name}</option>
                                    ))}
                                </select>
                            }
                        </div>
                        <div className="category">
                            <strong>Categoria</strong>
                            {userEdit === false ?
                                <p>{ticket.category}</p>
                                :

                                <select
                                    value={tmpCategory}
                                    onChange={e => setTmpCategory(e.target.value)}
                                >
                                    <option>E-mail</option>
                                    <option>SAP</option>
                                </select>
                            }
                        </div>
                        <div className="priority">
                            <strong>Prioridade</strong>
                            {userEdit === false ?
                                <p>{ticket.priority}</p>
                                :
                                <select
                                    value={tmpPriority}
                                    onChange={e => setTmpPriority(e.target.value)}
                                >
                                    <option>Baixa</option>
                                    <option>Média</option>
                                    <option>Alta</option>
                                    <option>Urgente</option>
                                </select>
                            }

                        </div>
                        <div className="dueDate">
                            <strong>Vencimento</strong>
                            {userEdit === false ?
                                <p>{ticket.duedate}</p>
                                :
                                <input
                                    type="date"
                                    value={tmpDuedate}
                                    onChange={e => setTmpDueDate(e.target.value)}
                                    min="2020-11-01" max="2030-12-31"
                                />
                            }
                        </div>
                        <div className="TIdueDate">
                            <strong>Prazo</strong>
                            {userEdit === true && admin === 'true' ?
                                <input
                                    type="date"
                                    value={tmpItEstimated}
                                    onChange={e => setTmpItEstimated(e.target.value)}
                                    min="2020-11-01" max="2030-12-31"
                                />
                                :
                                <p>
                                    {ticket.estimated}
                                </p>
                            }
                        </div>
                        <div className="status">
                            <strong>Status</strong>
                            {userEdit === false ?
                                <p>{ticket.status}</p>
                                :
                                <select
                                    value={tmpStatus}
                                    onChange={e => setTmpStatus(e.target.value)}
                                >
                                    <option value="Novo">Novo</option>
                                    <option value="Em aberto">Em aberto</option>
                                    <option value="Em andamento...">Em andamento...</option>
                                    <option value="Aguardando Matriz/Usuário">Aguardando Matriz/Usuário</option>
                                    <option value="Concluído">Concluído</option>
                                </select>
                            }

                        </div>
                    </div>

                    <div id="description" className="description">
                        <strong>Descrição</strong>
                        {userEdit === false ?
                            <textarea
                                readOnly
                                value={tmpDescription}
                                className="read-only"
                            >
                                {ticket.description}
                            </textarea>
                            :
                            <textarea
                                value={tmpDescription}
                                onChange={e => setTmpDescription(e.target.value)}
                            >
                            </textarea>
                        }

                    </div>

                    <div className="actions">
                        {userEdit === true ?
                            <div className="btn-action between">
                                <button onClick={handleModalAppear}><FaCommentDots size={33} />Comentar</button>
                                <button onClick={handleSaveChanges} className="animated"><FaSave size={33} />Salvar</button>
                                <button onClick={handleCancel}><FaTimesCircle size={33} />Cancelar</button>
                            </div>
                            :
                            <div className="btn-action">
                                <button onClick={handleModalAppear}><FaCommentDots size={33} />Comentar</button>
                            </div>
                        }
                    </div>
                </div>
                {replys.map(reply => (
                    <div className="reply-container" key={reply.id} >
                        <div className="reply-content">
                            <div className="reply-header">
                                <strong>{reply.user_reply}</strong>
                                <p><FaRegClock /> {reply.created_at}</p>
                            </div>

                            <div className="text">
                                <p>{reply.text}</p>
                            </div>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    );
}

export default TicketInfo;