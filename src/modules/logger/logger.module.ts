import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Logger, LoggerSchema } from './schemas/logger.schema';
import { DatabaseModule } from 'src/db/database.module';
import { databaseProviders } from 'src/db/database.providers';

import { loggerProviders } from './logger.providers';
import { LoggerService } from './logger.service_copy';

@Module({
    // imports: [DatabaseModule, MongooseModule.forFeature([{ name: Logger.name, schema: LoggerSchema }], 'loggins')],
    providers: [
        ...databaseProviders,
        LoggerService,
    ],
    exports: [LoggerService]
})
export class LoggerModule { }
