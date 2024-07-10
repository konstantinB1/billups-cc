import type { Knex } from 'knex';
import { Result } from '../../common';

export async function up(knex: Knex): Promise<void> {
    const hasType = await knex.schema.raw(
        "select exists (select 1 from pg_type where typname = 'match_type');"
    );

    if (!hasType.rows[0].exists) {
        await knex.schema.raw(
            `CREATE TYPE match_type AS ENUM ('win', 'lose', 'draw')`
        );
    }

    if (await knex.schema.hasTable('matches')) {
        return;
    }

    await knex.schema.createTable('matches', (table) => {
        table.increments('id').primary();
        table.enum('result', Object.values(Result), {
            useNative: true,
            enumName: 'match_type',
            existingType: true
        });
        table.integer('computer_choice');
        table.integer('player_choice');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('matches');
    await knex.schema.raw(`DROP TYPE match_type`);
}
