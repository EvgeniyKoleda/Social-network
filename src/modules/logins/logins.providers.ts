import { Connection } from 'typeorm';

import { DATABASE_CONSTS } from 'src/db/utils/constants';

import { Login } from './entities/login.entity';
import { PROVIDER_CONSTS } from './utils/constants';

export let loginProviders = [
	{
		provide: PROVIDER_CONSTS.LOGIN_REPOSITORY,
		useFactory: (connection: Connection) => connection.getRepository(Login),
		inject: [DATABASE_CONSTS.POSTGRES_CONNECTION],
	},
];
