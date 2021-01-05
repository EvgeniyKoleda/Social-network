import * as mongoose from 'mongoose';
import { createConnection } from 'typeorm';

import typeOrmConfig from './typeOrmConfig';

export let databaseProviders = [
	{
		provide: 'MONGO_CONNECTION',
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(
				'mongodb+srv://EVSX:<itechart2020>@socnet.ihe2k.mongodb.net/<SocNet>?retryWrites=true&w=majority',
			),
	},
	{
		provide: 'POSTGRES_CONNECTION',
		useFactory: async () => await createConnection(typeOrmConfig),
	},
];
