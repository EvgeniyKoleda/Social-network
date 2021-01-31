import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/db/database.module';
import { LoginsModule } from 'src/modules/logins/logins.module';

import { User } from './entities/user.entity';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([User]), LoginsModule],
	controllers: [UsersController],
	providers: [...userProviders, UsersService],
	exports: [UsersService],
})
export class UsersModule {}
