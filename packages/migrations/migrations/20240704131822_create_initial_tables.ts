import type { Knex } from 'knex';
import { Result } from '../../common';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('matches', (table) => {
        table.increments('id').primary();
        table.enum('result', [Result.Win, Result.Lose, Result.Draw]);
        table.integer('computer_choice');
        table.integer('player_choice');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('matches');
}
