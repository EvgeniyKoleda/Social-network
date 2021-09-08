import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import config from 'src/config';
import { LoginsModule } from 'src/modules/logins/logins.module';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersService } from 'src/modules/users/users.service';
import { userProviders } from 'src/modules/users/users.providers';
import { DatabaseModule } from 'src/db/database.module';
import { EmailModule } from 'src/modules/email/email.module';
import { S3ManagerModule } from 'src/modules/s3-manager/s3-manager.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

import { AuthResolver } from './graphql/auth.resolver';

@Module({
	imports: [
		PassportModule,
		LoginsModule,
		S3ManagerModule,
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: config.security.secretKey,
			signOptions: {
				expiresIn: `${config.security.expiresIn.time}${config.security.expiresIn.unit}`,
			},
		}),
		DatabaseModule,
		EmailModule,
	],
	controllers: [AuthController],
	providers: [
		LocalStrategy,
		AuthService,
		JwtStrategy,
		AuthResolver,
		...userProviders,
		UsersService,
	],
	exports: [JwtModule],
})
export class AuthModule {}
