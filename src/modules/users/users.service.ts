import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { v4 } from 'uuid';

import { ERRORS } from 'src/constants';
import { LoginsService } from 'src/modules/logins/logins.service';
import { UpdateLoginDto } from 'src/modules/logins/dto/update-login.dto';
// import { S3ManagerService } from 'src/modules/s3-manager/s3-manager.service';
import { BUCKET_NAMES } from 'src/constants';
import { EmailService } from 'src/modules/email/email.service';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PROVIDER_CONSTS } from './utils/constants';

@Injectable()
export class UsersService {
	constructor(
		@Inject(PROVIDER_CONSTS.USER_REPOSITORY)
		private userRepository: Repository<User>,
		private loginsService: LoginsService,
		private emailService: EmailService,
		private connection: Connection,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		let {
			avatar: promisedAvatar,
			password,
			login,
			...userData
		} = createUserDto;
		let userId = v4();
		let avatarUrl = null;

		if (!(password && login)) {
			throw new HttpException(
				ERRORS.dataErrors.invalidDataProvided,
				HttpStatus.BAD_REQUEST,
			);
		}

		// if (promisedAvatar) {
		// 	let { filename, createReadStream } = await promisedAvatar;
		// 	let fileExtention = filename.split('.').pop();

		// 	let { Location } = await this.s3ManagerService.putObjectByStream(
		// 		BUCKET_NAMES.AVATARS,
		// 		createReadStream(),
		// 		`avatar_${userId}.${fileExtention}`,
		// 	);
		// 	avatarUrl = String(Location).replace('localstack', 'localhost');
		// }

		let isUserExist = await this.userRepository.findOne({
			where: { email: createUserDto.email },
		});

		if (isUserExist) {
			throw new HttpException(
				ERRORS.dataErrors.userWithSuchEmailExists,
				HttpStatus.BAD_REQUEST,
			);
		}

		let queryRunner = this.connection.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			let user = Object.assign(new User(), userData, {
				avatarUrl,
				id: userId,
			});

			let createdUser = await queryRunner.manager.save(user);

			let createdLogin = await this.loginsService.create({
				password,
				login,
				userId: createdUser.id,
			});
			await queryRunner.commitTransaction();

			this.emailService.sendSignUp({
				receiverEmail: user.email,
				receiverName: user.fullName,
				password,
				login,
			});

			return { ...createdUser, login: createdLogin } as User;
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			await queryRunner.release();
		}
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findOne(query: {
		[key: string]: string | null | number;
	}): Promise<User> {
		return this.userRepository.findOne(query);
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		let { password, login, ...userData } = updateUserDto;

		await this.userRepository.save({ id, ...userData });

		let loginData: UpdateLoginDto = {};

		if (password) {
			loginData.password = password;
		}

		if (login) {
			loginData.login = login;
		}

		this.loginsService.update(id, { password, login });

		return this.userRepository.findOne(id);
	}

	async remove(id: string): Promise<{ id: string }> {
		await this.userRepository.delete(id);
		await this.loginsService.remove(id);

		return { id };
	}
}
