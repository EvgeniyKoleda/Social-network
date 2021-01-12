import { NestFactory } from '@nestjs/core';
import { Model } from 'mongoose';

import config from 'src/config';

import { AppModule } from 'src/modules/app/app.module';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Logger, LoggerDocument, LoggerSchema } from 'src/modules/logger/schemas/logger.schema';
// import { LoggerModule } from 'src/modules/logger/logger.module';

async function bootstrap() {
	let app = await NestFactory.create(AppModule, {
		logger: new LoggerService(),
	});

	app.setGlobalPrefix('api');

	await app.listen(config.host.port);
}
bootstrap();
