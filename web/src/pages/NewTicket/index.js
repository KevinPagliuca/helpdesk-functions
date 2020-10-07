import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import InputBlock from '../../components/InputBlock';

import api from '../../services/api';
import './newticket.css';

const NewTicket = () => {
    const [id, setId] = useState(localStorage.getItem('user_id'));
    const [userName, setUserName] = useState(localStorage.getItem('user_name'));
    const [email, setEmail] = useState(localStorage.getItem('user_email'));
    const [role, setRole] = useState(localStorage.getItem('user_role'));
    const [dept, setDept] = useState(localStorage.getItem('user_dept'));

    const [subject, setSubject] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [duedate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');

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
            alert('Chamado cadastrado com sucesso' + res)
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
                    <form className="form-newticket">
                        <InputBlock
                            id="subject"
                            label="Assunto"
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                         />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewTicket;