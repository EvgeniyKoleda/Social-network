import { ApiProperty } from '@nestjs/swagger';

import { Currency } from '../utils/constants';

export class CreateWalletDto {
	@ApiProperty()
	readonly amount: number;

	@ApiProperty({ enum: Currency })
	readonly currency: Currency;

	@ApiProperty()
	readonly userId: string;
}
