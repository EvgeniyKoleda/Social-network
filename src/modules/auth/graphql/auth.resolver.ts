import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// import { GqlAuthGuard } from 'src/modules/auth/jwt/jwt-graphql.guard';
import { Public } from 'src/modules/auth/public/public.decorator';

import { AuthService } from '../auth.service';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Mutation('login')
	async update(
		@Args('login') login: string,
		@Args('password') password: string,
	) {
		const user = await this.authService.validateUser(login, password);

		if (user) {
			return this.authService.login(user);
		}

		throw new UnauthorizedException();
	}
}
