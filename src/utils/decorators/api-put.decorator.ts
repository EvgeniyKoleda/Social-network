import { applyDecorators, Put } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiBody,
} from '@nestjs/swagger';

import { RESPONSES, Error } from 'src/constants';
import { Class } from 'src/types';

export let ApiPut = (entity: Class, entityName: string, updateDto: Class) => {
    return applyDecorators(
        ApiCreatedResponse({
            description: RESPONSES.UPDATE(entityName),
            type: entity,
        }),
        ApiUnauthorizedResponse({
            description: RESPONSES.UNATHORIZED(),
            type: Error,
        }),
        ApiBadRequestResponse({
            description: RESPONSES.BAD_REQUEST(),
            type: Error,
        }),
        Put(':id'),
        ApiBody({ type: updateDto }),
    );
}