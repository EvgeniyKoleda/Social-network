import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

import config from 'src/config';
import { ERRORS } from 'src/constants';
import { generatePassword } from 'src/utils/helpers/password';

import { LoginsService } from 'src/modules/logins/logins.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';

export type JWTPayloadType = {
	userId: string;
};

@Injectable()
export class AuthService {
	constructor(
		private loginsService: LoginsService,
		private usersService: UsersService,
		private emailService: EmailService,
		private jwtService: JwtService,
	) {}

	async validateUser(login: string, password: string): Promise<User | null> {
		let { user, ...loginData } = await this.loginsService.findOne({
			login,
		});

		if (!loginData) {
			return null;
		}

		let isMatchPassord = await bcrypt.compare(password, loginData.password);

		if (isMatchPassord) {
			return user;
		}

		return null;
	}

	async login(user: User) {
		let payload: JWTPayloadType = { userId: user.id };

		return {
			accessToken: this.jwtService.sign(payload),
			expiresIn: moment().add(
				Number(config.security.expiresIn.time),
				<moment.unitOfTime.DurationConstructor>(
					config.security.expiresIn.unit
				),
			),
		};
	}

	async resetPassword(email: string): Promise<{ id: string }> {
		let user = await this.usersService.findOne({ email });

		if (!user) {
			throw new HttpException(
				ERRORS.dataErrors.invalidDataProvided,
				HttpStatus.BAD_REQUEST,
			);
		}

		let newPassword = generatePassword(20);
		await this.loginsService.update(user.id, { password: newPassword });

		this.emailService.sendResetPassword({
			receiverEmail: user.email,
			receiverName: user.fullName,
			newPassword,
		});

		return {
			id: user.id,
		};
	}
}
