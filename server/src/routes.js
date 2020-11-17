const express =require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const TicketsController = require('./controllers/TicketsController');
const ReplysController = require('./controllers/ReplysController');


routes.post('/login', UserController.login);
routes.post('/register', UserController.create);
routes.post('/register/admin', UserController.createAdmin);

routes.get('/agents', UserController.agents);

routes.post('/newticket', TicketsController.create);
routes.get('/alltickets', TicketsController.index);
routes.get('/ticket/:id', TicketsController.show);
routes.get('/mytickets', TicketsController.userTickets);
routes.get('/closedtickets', TicketsController.closedTickets);

routes.post('/ticket/:id', ReplysController.create);

routes.put('/ticketAdmin/:id', TicketsController.admEdit);
routes.put('/ticketEdit/:id', TicketsController.ticketEdit);

module.exports = routes;