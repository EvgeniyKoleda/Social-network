import { applyDecorators, Delete } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { RESPONSES, Error, DeletedObject } from 'src/constants';

export let ApiDelete = (entityName: string) => {
	return applyDecorators(
		ApiUnauthorizedResponse({
			description: RESPONSES.UNATHORIZED(),
			type: Error,
		}),
		ApiBadRequestResponse({
			description: RESPONSES.BAD_REQUEST(),
			type: Error,
		}),
		ApiOkResponse({
			description: RESPONSES.DELETE(entityName),
			type: DeletedObject,
		}),
		Delete(':id'),
	);
};
