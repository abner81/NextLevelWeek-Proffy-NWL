import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('login_user', table => {
    table.increments('id').primary();
    table.string('email').notNullable().unique()
    table.string('password').notNullable()

    table
      .integer("user_id")
      .unique()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

  })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("login_user");
}
