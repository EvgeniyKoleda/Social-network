import { INestApplication } from '@nestjs/common';

import { enableUsersSwagger } from 'src/modules/users/users.module';
import { enableWalletsSwagger } from 'src/modules/wallets/wallets.module';

let swaggerModules = [enableUsersSwagger, enableWalletsSwagger];

export let enableSwagger = (app: INestApplication) => {
	swaggerModules.map((moduleAction: (app: INestApplication) => void) =>
		moduleAction(app),
	);
};
