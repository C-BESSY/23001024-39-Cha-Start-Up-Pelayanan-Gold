module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'cinema',
            user: 'postgres',
            password: '300603',
            host: 'localhost',
            port: '5432'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './db/migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
    },
}