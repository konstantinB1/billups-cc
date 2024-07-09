import knex from 'knex';
import config from '../migrations/knexfile';
import { type Match } from '../common/src/types';

export const matchesTable = 'matches';

export default function matchesModel() {
    const env = process.env.NODE_ENV || 'development';
    const connection = knex<Match>(config[env]);

    return {
        getLastResults: async (limit: number = 10): Promise<Match[]> =>
            connection(matchesTable)
                .select('*')
                .orderBy('id', 'desc')
                .limit(limit),
        saveMatch: async (match: Match) =>
            await connection(matchesTable).insert(match),

        toDto: (match: Match) => ({
            player: match.player_choice,
            computer: match.computer_choice,
            result: match.result
        })
    };
}
