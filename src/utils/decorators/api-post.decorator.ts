import { applyDecorators, Post } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiBody,
} from '@nestjs/swagger';

import { RESPONSES, Error } from 'src/constants';
import { Class } from 'src/types';

export let ApiPost = (entity: Class, entityName: string, createDto: Class) => {
    return applyDecorators(
        ApiCreatedResponse({
            description: RESPONSES.CREATE(entityName),
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
        Post(),
        ApiBody({ type: createDto }),
    );
}