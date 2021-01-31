import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'login' });
	}

	async validate(username: string, password: string): Promise<any> {
		let user = await this.authService.validateUser(username, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
