import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

import { PROVIDER_CONSTS } from './utils/constants';
import { LoggerService } from './logger.service';
import { LoggerSchema, Logger } from 'src/modules/logger/schemas/logger.schema';

export let loggerProviders = [
    {
        provide: PROVIDER_CONSTS.LOGGER_REPOSITORY,
        // useFactory: (connection: Connection) => new LoggerService(connection),
        inject: [getConnectionToken('loggins')],
    },
    // {
    //     provide: Logger.name,
    //     useFactory: (connection: Connection) => connection.model('Logger', LoggerSchema),
    //     inject: ['MONGO_CONNECTION'],
    // },
];