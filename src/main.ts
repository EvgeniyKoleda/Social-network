import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import config from 'src/config';

import { AppModule } from 'src/modules/app/app.module';
import { LoggerService } from 'src/modules/logger/logger.service';

let swaggerConfig = new DocumentBuilder()
	.setTitle('EVSX social network')
	.setDescription('The EVSX social network API description')
	.setVersion('1.0')
	.addTag('EVSX')
	.build();

async function bootstrap() {
	let app = await NestFactory.create(AppModule, {
		logger: new LoggerService(),
		cors: true,
	});

	app.use(helmet());

	app.setGlobalPrefix('api');

	let document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('swagger', app, document);

	await app.listen(config.host.port);
}

bootstrap();
