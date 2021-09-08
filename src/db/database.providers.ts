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
				`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ihe2k.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				},
			),
	},
];
