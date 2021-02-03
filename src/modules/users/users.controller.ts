import { Body, Param } from '@nestjs/common';

import { CustomController, ApiGet, ApiGetAll, ApiPut, ApiDelete } from 'src/utils/decorators';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@CustomController('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiGetAll(User, 'users')
	findAll() {
		return this.usersService.findAll();
	}

	@ApiGet(User, 'users')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne({ id });
	}

	@ApiPut(User, 'users', UpdateUserDto)
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@ApiDelete('users')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
