import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiPropertyOptional()
	readonly firstName?: string;

	@ApiPropertyOptional()
	readonly lastName?: string;

	@ApiPropertyOptional()
	readonly city?: string;

	@ApiPropertyOptional()
	readonly email?: string;

	@ApiPropertyOptional()
	readonly birthDate?: Date;

	@ApiPropertyOptional()
	readonly password?: string;

	@ApiPropertyOptional()
	readonly login?: string;
}
