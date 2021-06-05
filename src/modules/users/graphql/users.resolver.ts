import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from 'src/modules/users/users.service';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { GqlAuthGuard } from 'src/modules/auth/jwt/jwt-graphql.guard';

@Resolver('User')
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(GqlAuthGuard)
	@Query('users')
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(GqlAuthGuard)
	@Query('user')
	findOne(@Args('id') id: string) {
		return this.usersService.findOne({ id });
	}

	@UseGuards(GqlAuthGuard)
	@Mutation('updateUser')
	update(
		@Args('id') id: string,
		@Args('updateUserInput') updateUserDto: UpdateUserDto,
	) {
		return this.usersService.update(id, updateUserDto);
	}
}
