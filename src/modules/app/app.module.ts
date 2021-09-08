import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
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
					user: 'evsx.inc@gmail.com',
					pass: '5bd5bc78-abae-4a54-9834-aa9e9da30726',
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
					accessKeyId:
						process.env.AWS_ACCESS_KEY_ID ?? 'testaccesskey',
					secretAccessKey:
						process.env.AWS_SECRET_ACCESS_KEY ?? 'testsecretkey',
				},
				endpoint:
					process.env.DYNAMO_DB_END_POINT ?? 'http://localstack:4566',
			},
			services: [S3],
		}),
	],
	controllers: [AppController],
	providers: [AppService, DateScalar],
})
export class AppModule {}
