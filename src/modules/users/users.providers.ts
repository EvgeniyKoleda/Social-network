import { Connection } from 'typeorm';

import { DATABASE_CONSTS } from 'src/db/utils/constants';

import { User } from './entities/user.entity';
import { PROVIDER_CONSTS } from './utils/constants';

export let userProviders = [
	{
		provide: PROVIDER_CONSTS.USER_REPOSITORY,
		useFactory: (connection: Connection) => connection.getRepository(User),
		inject: [DATABASE_CONSTS.POSTGRES_CONNECTION],
	},
];
