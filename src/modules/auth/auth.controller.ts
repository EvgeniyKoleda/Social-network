import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';

import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Public } from 'src/modules/auth/public/public.decorator';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller()
export class AuthController {
	constructor(
		private authService: AuthService,
		private usersService: UsersService,
	) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('auth/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Public()
	@Post('auth/signup')
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}
}
