import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Currency } from '../utils/constants';

@Entity('wallets')
export class Wallet {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'float' })
	amount: number;

	@Column({ type: 'enum', enum: Currency })
	currency: string;

	@Column({ type: 'uuid' })
	userId: string;
}
