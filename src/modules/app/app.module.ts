import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from 'src/db/typeOrmConfig';
import { UsersModule } from 'src/modules/users/users.module';
import { WalletsModule } from 'src/modules/wallets/wallets.module';
import { LoggerModule } from 'src/modules/logger/logger.module';


import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, WalletsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
