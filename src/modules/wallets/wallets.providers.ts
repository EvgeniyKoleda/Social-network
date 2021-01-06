import { Connection } from 'typeorm';

import { DATABASE_CONSTS } from 'src/db/utils/constants';

import { Wallet } from './entities/wallet.entity';
import { PROVIDER_CONSTS } from './utils/constants';

export let walletProviders = [
    {
        provide: PROVIDER_CONSTS.WALLETS_REPOSITORY,
        useFactory: (connection: Connection) => connection.getRepository(Wallet),
        inject: [DATABASE_CONSTS.POSTGRES_CONNECTION],
    },
];