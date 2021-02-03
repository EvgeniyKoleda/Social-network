import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

export let CustomController = (entityName: string) => {
    return applyDecorators(
        ApiTags(entityName),
        ApiBearerAuth(),
        Controller(entityName),
    );
}