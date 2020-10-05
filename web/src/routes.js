import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Myaccount from './pages/Myaccount';
import MyTickets from './pages/MyTickets';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/myaccount" exact component={Myaccount} />
                <Route path="/mytickets" exact component={MyTickets} />
            </Switch>
        </BrowserRouter>
    );
}