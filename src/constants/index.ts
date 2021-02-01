import { ApiProperty } from '@nestjs/swagger';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const DATE_TIME_FORMAT = 'DD/MM/YYYY hh:mm:ss';

export const ERRORS = {
	dataErrors: {
		invalidDataProvided: 'Invalid data provided',
		wrongCredentials: 'Wrong credentials',
		userWithSuchEmailExists: 'User with such email already exists',
	},
};

export const RESPONSES = {
	UNATHORIZED: () => 'Unauthorized.',
	RETURN_ALL: (entity: string) => `Return all ${entity} in system.`,
	BAD_REQUEST: () => 'Bad request.',
	RETURN: (entity: string) => `Return ${entity} from system.`,
	CREATE: (entity: string) => `Create ${entity} in system.`,
	UPDATE: (entity: string) => `Update ${entity} in system.`,
	DELETE: (entity: string) => `Delete ${entity} in system.`,
}

export class Error {
	@ApiProperty()
	readonly statusCode: number;

	@ApiProperty()
	readonly message: string;
}

export class DeletedObject {
	@ApiProperty()
	readonly id: number;
}
