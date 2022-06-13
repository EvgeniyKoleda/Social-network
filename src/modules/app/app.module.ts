import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
// import { AwsModule } from 'nest-aws';

import typeOrmConfig from 'src/db/typeOrmConfig';
import { UsersModule } from 'src/modules/users/users.module';
import { WalletsModule } from 'src/modules/wallets/wallets.module';
import { AuthModule } from 'src/modules/auth/auth.module';
// import { S3ManagerModule } from 'src/modules/s3-manager/s3-manager.module';
import { DateScalar } from 'src/types/date';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const imports = [
	TypeOrmModule.forRoot(typeOrmConfig),
	UsersModule,
	WalletsModule,
	AuthModule,
	GraphQLModule.forRoot({
		debug: true,
		playground: true,
		typePaths: ['./**/*.graphql'],
		definitions: {
			path: join(process.cwd(), 'src/types/graphql.ts'),
			outputAs: 'class',
		},
		uploads: {
			maxFileSize: 10000000, // 10 MB
			maxFiles: 5,
		},
	}),
	MailerModule.forRoot({
		transport: {
			host: 'smtp.gmail.com',
			port: 587,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
			secure: false,
		},
		defaults: {
			from: '"nest-modules" <modules@nestjs.com>',
		},
		template: {
			dir: process.cwd() + '/public/templates/',
			adapter: new HandlebarsAdapter(), // or new PugAdapter()
			options: {
				strict: true,
			},
		},
	}),
];

// if (JSON.parse(process.env.S3_ENABLED)) {
// 	imports.push(AwsModule.forRoot({
// 		region: process.env.S3_REGION,
// 		accessKeyId: process.env.S3_ACCESS_KEY,
// 		secretAccessKey: process.env.S3_SECRET_KEY,
// 	}));
// 	imports.push(S3ManagerModule);
// }

@Module({
	imports,
	controllers: [AppController],
	providers: [AppService, DateScalar],
})
export class AppModule {}
