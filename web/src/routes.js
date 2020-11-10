import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Myaccount from './pages/Myaccount';
import MyTickets from './pages/MyTickets';
import AllTickets from './pages/AllTickets';
import NewTicket from './pages/NewTicket';
import TicketInfo from './pages/TicketInfo';
import Admin from './pages/Admin';

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
                <Route path="/ticket/:id" exact component={TicketInfo} />
                <Route path="/admin" exact component={Admin} />
            </Switch>
        </BrowserRouter>
    );
}