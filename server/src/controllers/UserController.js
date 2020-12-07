const connection = require('../database/connection');
const fs = require('fs');

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    async index(req, res) {
        const { id } = req.params;

        const user = await connection('users')
            .select('*')
            .where('id', id)
            .first();

        const serializedUser = {
            ...user,
            image_url: `http://192.168.230.115:3333/uploads/user-imgs/${user.avatar}`,
        };

        return res.json(serializedUser);
    },

    async agents(req, res) {

        const consultarAgentes = await connection('users')
            .select('id', 'name')
            .where('permission', 1);

        if (!consultarAgentes) {
            res.status(500).json({ Erro: "Algo deu errado na sua consulta..." });
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
                res.status(201).json({ id: insertUser[0], Success: 'Cadastrado com sucesso!' });
            });
        } else {
            res.status(400).json({ Error: "Email já existente no sistema." });
        }
    },

    async update(req, res) {
        const {
            name,
            email,
            dept,
            role
        } = req.body;

        global.user_id = req.headers.user_id;

        var date = new Date();
        const DataHoje = date.toLocaleString();

        const consult = await connection('users')
            .select('*')
            .where('id', global.user_id)
            .first();

        if (consult) {
            if (req.file !== undefined) {
                const user = {
                    avatar: req.file.filename,
                    name,
                    email,
                    dept,
                    role,
                    updated_at: DataHoje
                };

                await connection('users')
                    .where('id', global.user_id)
                    .update(user);

                const updatedUser = await connection('users')
                    .select('*')
                    .where('id', global.user_id)
                    .first();
                return res.json(updatedUser);
            } else {
                const user = {
                    name,
                    email,
                    dept,
                    role,
                    updated_at: DataHoje
                };

                await connection('users')
                    .where('id', global.user_id)
                    .update(user);

                const updatedUser = await connection('users')
                    .select('*')
                    .where('id', global.user_id)
                    .first();
                return res.json(updatedUser);
            }
        } else {
            return res.json({ Error: 'Não sabemos oque aconteceu :(' })
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
                res.status(201).json({ id: insertUser[0], Success: 'Cadastrado com sucesso!' });
            });

        } else {
            res.status(400).json({ Error: "Email já existente no sistema." })

        }
    },

    async login(req, res) {
        const {
            email,
            password
        } = req.body;

        const consult = await connection('users')
            .select('id', 'name', 'email', 'dept', 'avatar', 'role', 'permission', 'created_at', 'updated_at')
            .where('email', email)
            .first();

        const findpass = await connection('users')
            .select('password')
            .where('email', email)
            .first();

        if (findpass) {
            const match = await bcrypt.compare(password, findpass.password); // Faz a comparação da senha digitada com a senha cadastrada no BD

            if (match) {

                const serializedUser = {
                    ...consult,
                    image_url: `http://192.168.230.115:3333/uploads/user-imgs/${consult.avatar}`,
                };
                return res.json(serializedUser);
            } else {
                return res.status(401).json({ Error: 'Sua senha está incorreta, verifique-a e tente novamente!' })
            }
        }
        if (!consult) {
            return res.status(400).json({ Error: "O Email informado não está cadastrado em nosso sistema, tente novamente!" });
        }
    },
}