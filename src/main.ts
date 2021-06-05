import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import config from 'src/config';

import { enableSwagger } from 'src/swagger';
import { AppModule } from 'src/modules/app/app.module';
import { LoggerService } from 'src/modules/logger/logger.service';

async function bootstrap() {
	let app = await NestFactory.create(AppModule, {
		logger: new LoggerService(),
		cors: true,
	});

	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === 'production' ? undefined : false,
		}),
	);

	app.setGlobalPrefix('api');

	enableSwagger(app);

	await app.listen(config.host.port);
}

bootstrap();
