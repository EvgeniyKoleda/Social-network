import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Currency } from '../utils/constants';

@Entity('wallets')
export class Wallet {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column({ type: 'float' })
	amount: number;

	@ApiProperty({ enum: Currency })
	@Column({ type: 'enum', enum: Currency })
	currency: string;

	@ApiProperty()
	@Column({ type: 'uuid' })
	userId: string;
}
