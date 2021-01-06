import * as mongoose from 'mongoose';
import { createConnection } from 'typeorm';

import typeOrmConfig from './typeOrmConfig';

export let databaseProviders = [
	{
		provide: 'POSTGRES_CONNECTION',
		useFactory: async () => await createConnection(typeOrmConfig),
	},
	{
		provide: 'MONGO_CONNECTION',
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(
				'mongodb+srv://socnet-admin:itechart2021@cluster0.ihe2k.mongodb.net/socnet?retryWrites=true&w=majority',
				{
					useNewUrlParser: true,
					useUnifiedTopology: true
				}
			),
	},
];
