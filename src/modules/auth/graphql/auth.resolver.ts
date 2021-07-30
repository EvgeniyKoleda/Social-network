import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from 'src/modules/auth/public/public.decorator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';

import { AuthService } from '../auth.service';

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

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

	@Mutation('signup')
	async create(@Args('userData') userData: CreateUserDto) {
		return this.usersService.create(userData);
	}
}
