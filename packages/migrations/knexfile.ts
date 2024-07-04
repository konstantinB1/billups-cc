import { type Knex } from 'knex';

console.log('process.env.POSTGRES_DB', process.env.POSTGRES_DB);
console.log('process.env.POSTGRES_USER', process.env.POSTGRES_USER);
console.log('process.env.POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
console.log('process.env.POSTGRES_HOST', process.env.POSTGRES_HOST);

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations',
        },
    },
};

export default config;
