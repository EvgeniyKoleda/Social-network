import { ApiPropertyOptional } from '@nestjs/swagger';

import { Currency } from '../utils/constants';

export class UpdateWalletDto {
	@ApiPropertyOptional()
	readonly amount: number;

	@ApiPropertyOptional({ enum: Currency })
	readonly currency: Currency;

	@ApiPropertyOptional()
	readonly userId: string;
}
