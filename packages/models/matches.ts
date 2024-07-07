import knex from 'knex';
import config from '../migrations/knexfile';
import { type Result } from '../common';

type Match = {
    player_choice: number;
    computer_choice: number;
    result: Result;
};

export const matchesTable = 'matches';

export default function matchesModel() {
    const env = process.env.NODE_ENV || 'development';
    const connection = knex<any, Match>(config[env]);
    return {
        getLastResults: async (limit: number = 10): Promise<Match[]> => {
            return connection(matchesTable)
                .select('*')
                .orderBy('id', 'desc')
                .limit(limit);
        },
        saveMatch: async (match: Match) => {
            return await connection(matchesTable).insert(match);
        },

        toDto: (match: Match) => {
            return {
                player: match.player_choice,
                computer: match.computer_choice,
                result: match.result,
            };
        },
    };
}
