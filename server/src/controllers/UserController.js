const connection = require('../database/connection');


const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            password
        } = req.body;

        const consult = await connection('users')
            .select('*')
            .where('email', email)
            .first();

        var date = new Date();
        const DataHoje = date.toLocaleString();


        if (!consult) {
            await bcrypt.hash(password, saltRounds, async (err, hash) => {
                const insertUser = await connection('users').insert({
                    name,
                    email,
                    dept,
                    role,
                    password: hash,
                    created_at: DataHoje,
                    updated_at: DataHoje
                });
                res.status(201).json({ id: insertUser[0] });
            });

        } else {
            res.status(400).json({ Error: "E-mail já existe!" })

        }
    },

    async createAdmin(req, res) {
        const {
            name,
            email,
            dept,
            role,
            password
        } = req.body;

        const consult = await connection('users')
            .select('*')
            .where('email', email)
            .first();

        var date = new Date();
        const DataHoje = date.toLocaleString();


        if (!consult) {
            await bcrypt.hash(password, saltRounds, async (err, hash) => {
                const insertUser = await connection('users').insert({
                    name,
                    email,
                    dept,
                    role,
                    password: hash,
                    permission: 1,
                    created_at: DataHoje,
                    updated_at: DataHoje
                });
                res.status(201).json({ id: insertUser[0] });
            });

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
            .select('id', 'name', 'email', 'dept', 'role', 'permission', 'created_at', 'updated_at')
            .where('email', email)
            .first();

        const findpass = await connection('users')
            .select('password')
            .where('email', email)
            .first();

        if (findpass) {
            const match = await bcrypt.compare(password, findpass.password); // Faz a comparação da senha digitada com a senha cadastrada no BD

            if (match) {
                return res.json(consult);
            } else {
                return res.status(401).json({ Error: 'Sua senha está incorreta, verifique-a e tente novamente!' })
            }
        }
        if (!consult) {
            return res.status(400).json({ Error: "O E-mail informado não está cadastrado em nosso sistema, tente novamente!" });
        }
    },
}