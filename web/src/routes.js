import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Myaccount from './pages/Myaccount';
import MyTickets from './pages/MyTickets';
import AllTickets from './pages/AllTickets';
import NewTicket from './pages/NewTicket';
import TicketInfo from './pages/TicketInfo';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/myaccount" exact component={Myaccount} />
                <Route path="/mytickets" exact component={MyTickets} />
                <Route path="/alltickets" exact component={AllTickets} />
                <Route path="/newticket" exact component={NewTicket} />
                <Route path="/ticket/:id" exact component={TicketInfo} />
            </Switch>
        </BrowserRouter>
    );
}