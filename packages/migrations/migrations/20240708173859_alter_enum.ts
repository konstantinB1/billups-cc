import type { Knex } from 'knex';
import { Result } from '../../common/src';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(
        `CREATE TYPE match_type AS ENUM ('Win', 'Lose', 'Draw')`
    );

    await knex.schema.alterTable('matches', (table) => {
        table.dropColumn('result');
        table.enum('result', Object.values(Result), {
            useNative: true,
            enumName: 'match_type',
            existingType: true
        });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.raw(`DROP TYPE match_type`);
    await knex.schema.alterTable('matches', (table) => {
        table.dropColumn('result');
        table.enum('result', [Object.values(Result)]);
    });
}
