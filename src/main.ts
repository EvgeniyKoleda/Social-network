import { NestFactory } from '@nestjs/core';

import config from 'src/config';

import { AppModule } from 'src/modules/app/app.module';
import { LoggerService } from 'src/modules/logger/logger.service';

async function bootstrap() {
	let app = await NestFactory.create(AppModule, {
		logger: new LoggerService(),
		cors: true,
	});

	app.setGlobalPrefix('api');

	await app.listen(config.host.port);
}

bootstrap();
