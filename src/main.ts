import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { join } from 'path';
import config from 'src/config';

import { enableSwagger } from 'src/swagger';
import { AppModule } from 'src/modules/app/app.module';
import { LoggerService } from 'src/modules/logger/logger.service';

async function bootstrap() {
	let app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new LoggerService(),
		cors: true,
	});

	app.use(
		helmet({
			contentSecurityPolicy:
				process.env.NODE_ENV === 'production' ? undefined : false,
		}),
	);
	app.useStaticAssets(join('/app/', config.filesDir));

	app.setGlobalPrefix('api');

	enableSwagger(app);

	await app.listen(config.host.port);
}

bootstrap();
