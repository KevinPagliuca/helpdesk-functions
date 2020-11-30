import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Myaccount from './pages/Myaccount';
import MyTickets from './pages/MyTickets';
import AllTickets from './pages/AllTickets';
import NewTicket from './pages/NewTicket';
import TicketInfo from './pages/TicketInfo';
import ClosedTickets from './pages/CompletedTickets';

import Admin from './pages/Admin';
import CreateAccount from './pages/Admin/CreateAccount';

export default function Routes() {
    const session = sessionStorage.getItem('status');

    useEffect(() => {

    }, [session]);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/myaccount" exact component={Myaccount} />

                <Route path="/mytickets" exact component={MyTickets} />
                <Route path="/alltickets" exact component={AllTickets} />
                <Route path="/newticket" exact component={NewTicket} />
                <Route path="/closedTickets" exact component={ClosedTickets} />                
                <Route path="/ticket/:id" exact component={TicketInfo} />
                
                <Route path="/admin" exact component={Admin} />
                <Route path="/admin/createAccount" exact component={CreateAccount} />
            </Switch>
        </BrowserRouter>
    );
}