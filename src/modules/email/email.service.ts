import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { createReadStream } from 'fs';
import { join } from 'path';

import config from 'src/config';

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	private getBaseConfig() {
		return {
			from: config.mailer.originAdress,
			attachments: [
				{
					content: createReadStream(
						join('/app', '/public/images/logo.png'),
					),
					cid: 'logo',
					filename: 'logo.png',
				},
			],
		};
	}

	public sendResetPassword(emailData: {
		receiverEmail: string;
		receiverName: string;
		newPassword: string;
	}): void {
		this.mailerService
			.sendMail({
				...this.getBaseConfig(),
				to: emailData.receiverEmail,
				subject: 'Password has been reset successfully!',
				template: 'public/templates/reset-password',
				context: {
					receiverName: emailData.receiverName,
					newPassword: emailData.newPassword,
					webAppLogin: `${config.webApp.getHost()}/login`,
				},
			})
			.then((success) => console.log(success))
			.catch((err) => console.log(err));
	}
}
