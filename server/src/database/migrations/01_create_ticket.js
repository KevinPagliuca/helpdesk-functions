const knex = require('knex');

exports.up = function(knex){
    return knex.schema.createTable('tickets', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.string('category').notNullable();
        table.string('priority').notNullable();
        table.date('duedate').notNullable();
        table.date('estimated').defaultTo('IT Only');
        table.string('description').notNullable();
        table.string('assignTo').notNullable();     
        table.string('status').defaultTo('Novo');  
        table.decimal('version', 1).defaultTo(1);
        table.string('last_update').defaultTo('');
        table.boolean('due_expired').defaultTo(null);
        table.timestamp('created_at');
        table.timestamp('updated_at');

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.string('user_name')
        .notNullable()
        .references('name')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
}

exports.down = function(knex){
    return knex.schema.dropTable('tickets');
}