const knex = require('knex');

exports.up = function(knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('dept').notNullable();
        table.string('role').notNullable();
        table.string('password').notNullable();        
        table.string('permission').defaultTo(1); // 1 para normal, 0 para adm       
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
}

exports.down = function(knex){
    return knex.schema.dropTable('users');
}