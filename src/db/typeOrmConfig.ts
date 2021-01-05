import { ConnectionOptions } from 'typeorm';

let config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'socnet-admin',
    password: 'socnet-secure-password',
    database: 'socnet',
    entities: [
        'src/modules/**/*.entity{.ts,.js}',
    ],
    migrations: [
        'src/db/migrations/*.ts'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
};

export = config;
