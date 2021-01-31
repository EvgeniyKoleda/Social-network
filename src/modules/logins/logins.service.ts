import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import config from 'src/config';

import { Login } from './entities/login.entity';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { PROVIDER_CONSTS } from './utils/constants';

@Injectable()
export class LoginsService {
	constructor(
		@Inject(PROVIDER_CONSTS.LOGIN_REPOSITORY)
		private loginRepository: Repository<Login>,
	) {}

	async create(createLoginDto: CreateLoginDto): Promise<Login> {
		let login = Object.assign(new Login(), createLoginDto);

		return this.loginRepository.save(login);
	}

	async findOne(query: {
		[key: string]: string | null | number;
	}): Promise<Login> {
		return this.loginRepository.findOne({
			where: query,
			relations: ['user'],
		});
	}

	async update(
		userId: string,
		updateUserDto: UpdateLoginDto,
	): Promise<Login> {
		let login = await this.findOne({ userId });

		let loginData = { ...updateUserDto };

		if (updateUserDto.password) {
			loginData.password = await bcrypt.hash(
				updateUserDto.password,
				config.security.saltOrRounds,
			);
		}

		await this.loginRepository.save({ id: login.id, ...loginData });

		return this.loginRepository.findOne({ id: login.id });
	}

	async remove(userId: string): Promise<{ id: string }> {
		let login = await this.findOne({ userId });

		await this.loginRepository.delete(login.id);

		return { id: login.id };
	}
}
