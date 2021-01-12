import { Module } from '@nestjs/common';

import { databaseProviders } from 'src/db/database.providers';

import { LoggerService } from './logger.service';

@Module({
    providers: [
        ...databaseProviders,
        LoggerService,
    ],
    exports: [LoggerService]
})
export class LoggerModule { }
