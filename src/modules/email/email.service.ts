import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import config from 'src/config';

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	public sendResetPassword(emailData: {
		receiverEmail: string;
		receiverName: string;
		newPassword: string;
	}): void {
		this.mailerService
			.sendMail({
				to: emailData.receiverEmail,
				from: config.mailer.originAdress,
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
