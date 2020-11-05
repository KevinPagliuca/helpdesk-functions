const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { id } = req.params;

        const user = await connection('users')
            .select('*')
            .where('id', id)
            .first();

        return res.json(user);
    },

    async agents(req, res) {

        const consultarAgentes = await connection('users')
            .select('id', 'name', 'email')
            .where('permission', 1);

        if (!consultarAgentes) {
            res.status(500).json({ Erro: "Algo deu errado na sua consulta..." })
        }
        res.status(200).json(consultarAgentes);
    },

    async create(req, res) {
        const {
            name,
            email,
            dept,
            role,
            password,
            permission
        } = req.body;

        var date = new Date();
        const DataHoje = date.toLocaleString();

        const consult = await connection('users')
            .select('*')
            .where('email', email)
            .first();

        if (!consult) {
            const insertUser = await connection('users').insert({
                name,
                email,
                dept,
                role,
                password,
                permission,
                created_at: DataHoje,
                updated_at: DataHoje
            });
            res.status(201).json(insertUser);
        } else {
            res.status(400).json({ Error: "E-mail já existe!" })
        }

    },
    async login(req, res) {
        const {
            email,
            password
        } = req.body;

        const consult = await connection('users')
            .select('*')
            .where('email', email)
            .where('password', password)
            .first();

        if (!consult) {
            return res.status(400).json({ error: "Dados incorretos, confira e tente novamente!" });
        }

        return res.json(consult);
    },
}