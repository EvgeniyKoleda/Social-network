import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/db/database.module';

import { Login } from './entities/login.entity';
import { loginProviders } from './logins.providers';
import { LoginsService } from './logins.service';

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([Login])],
	providers: [...loginProviders, LoginsService],
	exports: [LoginsService],
})
export class LoginsModule {}
