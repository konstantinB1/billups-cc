import { type Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: {
            database: process.env.POSTGRESS_DB,
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
