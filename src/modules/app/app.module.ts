import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

import typeOrmConfig from 'src/db/typeOrmConfig';
import { UsersModule } from 'src/modules/users/users.module';
import { WalletsModule } from 'src/modules/wallets/wallets.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { S3ManagerModule } from 'src/modules/s3-manager/s3-manager.module';
import { DateScalar } from 'src/types/date';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
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
		S3ManagerModule,
		AwsSdkModule.forRoot({
			defaultServiceOptions: {
				s3ForcePathStyle: true,
				region: 'ap-southeast-1',
				credentials: {
					accessKeyId: 'testaccesskey',
					secretAccessKey: 'testsecretkey',
				},
				endpoint: 'http://localstack:4566',
			},
			services: [S3],
		}),
	],
	controllers: [AppController],
	providers: [AppService, DateScalar],
})
export class AppModule {}
