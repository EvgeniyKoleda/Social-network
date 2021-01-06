import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from 'src/db/typeOrmConfig';
import { UsersModule } from 'src/modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// console.log(typeOrmConfig);

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
