import * as mongoose from 'mongoose';
import { Sequelize } from 'sequelize-typescript';

export let databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(
				'mongodb+srv://EVSX:<itechart2020>@socnet.ihe2k.mongodb.net/<SocNet>?retryWrites=true&w=majority',
			),
	},
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			let sequelize = new Sequelize({
				dialect: 'postgres',
				host: 'localhost',
				port: 5432,
				username: 'socnet-admin',
				password: 'socnet-secure-password',
				database: 'socnet',
			});

			sequelize.addModels([]);

			await sequelize.sync();

			return sequelize;
		},
	},
];
