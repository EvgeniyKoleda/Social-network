import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { createReadStream } from 'fs';
import { join } from 'path';

import config from 'src/config';

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	private _getBaseConfig() {
		return {
			from: config.mailer.originAdress,
			attachments: [
				{
					content: createReadStream(join('/app', '/public/images/logo.png')),
					cid: 'logo',
					filename: 'logo.png',
				},
			],
		};
	}

	public async sendResetPassword(emailData: {
		receiverEmail: string;
		receiverName: string;
		newPassword: string;
	}): Promise<any> {
		try {
			return this.mailerService.sendMail({
				...this._getBaseConfig(),
				to: emailData.receiverEmail,
				subject: 'Password has been reset successfully!',
				template: 'public/templates/reset-password',
				context: {
					receiverName: emailData.receiverName,
					newPassword: emailData.newPassword,
					webAppLogin: `${config.webApp.getHost()}/login`,
				},
			});
		} catch (e) {
			throw e;
		}
	}

	public async sendSignUp(emailData: {
		receiverEmail: string;
		receiverName: string;
		password: string;
		login: string;
	}): Promise<any> {
		try {
			return this.mailerService.sendMail({
				...this._getBaseConfig(),
				to: emailData.receiverEmail,
				subject: 'Thank you for a signup!',
				template: 'public/templates/signup',
				context: {
					receiverName: emailData.receiverName,
					password: emailData.password,
					login: emailData.login,
					webAppLogin: `${config.webApp.getHost()}/login`,
				},
			});
		} catch (e) {
			throw e;
		}
	}
}
