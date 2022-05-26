import { Module, INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	SwaggerModule,
	DocumentBuilder,
	SwaggerDocumentOptions,
} from '@nestjs/swagger';

import { DatabaseModule } from 'src/db/database.module';
import { AuthModule } from 'src/modules/auth/auth.module';

import { Wallet } from './entities/wallet.entity';
import { walletProviders } from './wallets.providers';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';

@Module({
	imports: [DatabaseModule, TypeOrmModule.forFeature([Wallet])],
	controllers: [WalletsController],
	providers: [...walletProviders, WalletsService],
})
export class WalletsModule {}

export let enableWalletsSwagger = (app: INestApplication) => {
	let swaggerConfig = new DocumentBuilder()
		.setTitle('EVSX social network[Wallets]')
		.setDescription('The EVSX social network API description')
		.setVersion('1.0')
		.addTag('EVSX')
		.addBearerAuth()
		.build();

	let options: SwaggerDocumentOptions = {
		operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
		include: [WalletsModule, AuthModule],
	};

	let document = SwaggerModule.createDocument(app, swaggerConfig, options);
	SwaggerModule.setup('swagger/wallets', app, document);
};
