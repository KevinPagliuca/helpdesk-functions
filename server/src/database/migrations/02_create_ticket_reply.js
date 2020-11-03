const knex = require('knex');

exports.up = function (knex) {
    return knex.schema.createTable('replys_tickets', table => {
        table.increments('id').primary();
        table.string('text').notNullable();        
        table.string('ticket_id')
        .notNullable()
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
        
        table.string('user_reply')
        .notNullable()
        .references('name')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.string('user_id_reply')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
}

exports.down = function (knex) {
    return knex.schema.dropTable('replys_tickets');
}