const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { text } = req.body;
        const { id } = req.params; // desconstrução do ID do chamado para vincular...
        const user_reply = req.headers.user_name;
        const user_id_reply = req.headers.user_id_reply;

        var date = new Date();
        const DataHoje = date.toLocaleString();

        try {            
            const insertReply = await connection('replys_tickets').insert({
                text,
                user_reply,
                user_id_reply,
                ticket_id: id,
                created_at: DataHoje,
                updated_at: DataHoje
            });
            if(!insertReply){
                res.status(400).json({Error: "Erro ao cadastrar comentário..."})
            } 
            const idReply = insertReply[0];
            res.status(200).json({id: idReply, text: text});

        } catch(err){
            res.status(400).json({error: err});
        }
    }
}