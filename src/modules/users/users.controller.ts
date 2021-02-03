import { Controller, Get, Body, Put, Param, Delete } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiTags,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiBadRequestResponse,
	ApiBody,
} from '@nestjs/swagger';

import { RESPONSES, Error, DeletedObject } from 'src/constants';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiUnauthorizedResponse({
		description: RESPONSES.UNATHORIZED(),
		type: Error,
	})
	@ApiOkResponse({
		description: RESPONSES.RETURN_ALL('users'),
		type: [User],
	})
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@ApiUnauthorizedResponse({
		description: RESPONSES.UNATHORIZED(),
		type: Error,
	})
	@ApiOkResponse({
		description: RESPONSES.RETURN('user'),
		type: User,
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne({ id });
	}

	@ApiCreatedResponse({
		description: RESPONSES.UPDATE('user'),
		type: User,
	})
	@ApiUnauthorizedResponse({
		description: RESPONSES.UNATHORIZED(),
		type: Error,
	})
	@ApiBadRequestResponse({
		description: RESPONSES.BAD_REQUEST(),
		type: Error,
	})
	@Put(':id')
	@ApiBody({ type: UpdateUserDto })
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@ApiUnauthorizedResponse({
		description: RESPONSES.UNATHORIZED(),
		type: Error,
	})
	@ApiBadRequestResponse({
		description: RESPONSES.BAD_REQUEST(),
		type: Error,
	})
	@ApiOkResponse({
		description: RESPONSES.DELETE('user'),
		type: DeletedObject,
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
