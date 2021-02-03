import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { RESPONSES, Error } from 'src/constants';
import { Class } from 'src/types';

export let ApiGetAll = (entity: Class, entityName: string) => {
	return applyDecorators(
		ApiUnauthorizedResponse({
			description: RESPONSES.UNATHORIZED(),
			type: Error,
		}),
		ApiOkResponse({
			description: RESPONSES.RETURN_ALL(entityName),
			type: [entity],
		}),
		Get(),
	);
};
