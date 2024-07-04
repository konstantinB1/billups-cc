import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('matches', (table) => {
        table.increments('id').primary();
        table.enum('result', ['win', 'loss', 'draw']);
        table.string('computer_choice');
        table.string('player_choice');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('matches');
}
