import { Module, INestApplication, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

import { DatabaseModule } from 'src/db/database.module';
import { LoginsModule } from 'src/modules/logins/logins.module';
import { AuthModule } from 'src/modules/auth/auth.module';

import { User } from './entities/user.entity';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([User]), LoginsModule],
	controllers: [UsersController],
	providers: [...userProviders, UsersService],
	exports: [UsersService],
})
export class UsersModule {}

export let enableUsersSwagger = (app: INestApplication) => {
	let swaggerConfig = new DocumentBuilder()
	.setTitle('EVSX social network[Users]')
	.setDescription('The EVSX social network API description')
	.setVersion('1.0')
	.addTag('EVSX')
	.addBearerAuth()
	.build();

	let options: SwaggerDocumentOptions =  {
		operationIdFactory: (
			controllerKey: string,
			methodKey: string
		) => methodKey,
		include: [
			UsersModule,
			AuthModule,
		],
	};

	let document = SwaggerModule.createDocument(app, swaggerConfig, options);
	SwaggerModule.setup('swagger/users', app, document);
} 