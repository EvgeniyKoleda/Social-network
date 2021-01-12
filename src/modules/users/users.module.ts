import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/db/database.module';
import { LoggerModule } from 'src/modules/logger/logger.module';

import { User } from './entities/user.entity';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), LoggerModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
  ]
})
export class UsersModule { }
