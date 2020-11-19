const connection = require('../database/connection');

module.exports = {
    // criar tickets
    async create(req, res) {
        const {
            subject,
            category,
            priority,
            duedate,
            description,
            assignTo,
            status
        } = req.body;

        var date = new Date();
        const DataHoje = date.toLocaleString();

        const user_id = req.headers.user_id;
        const user_name = req.headers.user_name;

        const id = await connection('tickets').insert({
            subject,
            category,
            priority,
            duedate,
            description,
            assignTo,
            status,
            user_id,
            user_name,
            created_at: DataHoje,
            updated_at: DataHoje
        });

        return res.status(200).json({ id });
    },
    // Listar todos os tickets

    async index(req, res) {

        const ListarChamados = await connection('tickets')
            .select('*')
            .where('status', '!=', 'Concluído');

        return res.status(200).json(ListarChamados);
    },
    //listar ticket específico pelo ID.
    async show(req, res) {
        const { id } = req.params;

        const ticket = await connection('tickets')
            .select('*')
            .where('id', id)
            .first();

        const reply_ticket = await connection('replys_tickets')
            .select('*')
            .where('ticket_id', id);

        if (!ticket) {
            return res.status(400).json({ Erro: "Algo deu errado..." });
        } else {
            return res.status(200).json([ticket, reply_ticket]);
        }

    },

    async userTickets(req, res) {
        const user_id = req.headers.user_id;

        if (!user_id) {
            return res.status(400).json({ Error: 'Algo deu errado ao listar seus chamados, tente novamente...' })
        } else {
            const tickets = await connection('tickets')
                .select('*')
                .where('user_id', user_id)
                .where('status', '!=', 'Concluído');
            return res.status(200).json(tickets);
        }
    },

    async closedTickets(req, res) {

        const closedTickets = await connection('tickets')
            .select('*')
            .where('status', 'Concluído');

        if (!closedTickets) {
            return res.status(400).json({ Error: 'Algo não funcionou da maneira correta, tente novamente...' });
        }
        return res.status(200).json(closedTickets);
    },

    async ticketEdit(req, res) {
        const { id } = req.params;
        const user_id = req.headers.user_id;
        const admin = req.headers.admin;

        const { subject, category, priority, duedate, description, assignTo, status, estimated } = req.body;

        const ticket = await connection('tickets')
            .select('*')
            .where('id', id)
            .first();
            
        if (ticket) {
            var date = new Date();
            const DataHoje = date.toLocaleString();

            if (ticket.user_id == user_id || admin === "true") {

                await connection('tickets')
                    .where('id', id)
                    .update({
                        subject,
                        category,
                        priority,
                        duedate,
                        description,
                        estimated,
                        assignTo,
                        status,
                        updated_at: DataHoje
                    });

                res.status(200).json({ Success: 'Alterado com sucesso!' });
            } else {
                res.status(401).json({ Error: 'Não permitido!' });
            }
        } else {
            res.status(404).json({ Error: 'Ticket não encontrado, tente novamente!' })
        }
    }
}