import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmConfig from 'src/db/typeOrmConfig';
import { UsersModule } from 'src/modules/users/users.module';
import { WalletsModule } from 'src/modules/wallets/wallets.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt-auth.guard'; 

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, WalletsModule, AuthModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: 'APP_GUARD',
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule { }
