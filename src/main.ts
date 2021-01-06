import { NestFactory } from '@nestjs/core';

import config from 'src/config';

import { AppModule } from 'src/modules/app/app.module';

async function bootstrap() {
	let app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	await app.listen(config.host.port);
}
bootstrap();
