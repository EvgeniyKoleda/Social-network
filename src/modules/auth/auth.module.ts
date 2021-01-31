import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import config from 'src/config';
import { LoginsModule } from 'src/modules/logins/logins.module';
import { UsersModule } from 'src/modules/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		LoginsModule,
		UsersModule,
		JwtModule.register({
			secret: config.security.secretKey,
			signOptions: {
				expiresIn: `${config.security.expiresIn.time}${config.security.expiresIn.unit}`,
			},
		}),
	],
	controllers: [AuthController],
	providers: [LocalStrategy, AuthService, JwtStrategy],
	exports: [JwtModule],
})
export class AuthModule {}
