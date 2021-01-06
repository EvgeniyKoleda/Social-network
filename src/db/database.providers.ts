import * as mongoose from 'mongoose';
import { createConnection } from 'typeorm';

import { DATABASE_CONSTS } from './utils/constants';
import typeOrmConfig from './typeOrmConfig';

export let databaseProviders = [
	{
		provide: DATABASE_CONSTS.POSTGRES_CONNECTION,
		useFactory: async () => await createConnection(typeOrmConfig),
	},
	{
		provide: DATABASE_CONSTS.MONGO_CONNECTION,
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
