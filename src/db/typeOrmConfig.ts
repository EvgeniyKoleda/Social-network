import { ConnectionOptions } from 'typeorm';

let config: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'socnet-admin',
	password: 'socnet-secure-password',
	database: 'socnet',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/db/migrations/*.js'],
	cli: {
		migrationsDir: 'src/db/migrations',
	},
};

export default config;
