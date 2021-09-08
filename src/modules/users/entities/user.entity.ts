import { ApiProperty } from '@nestjs/swagger';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BeforeInsert,
	OneToOne,
} from 'typeorm';

import { Login } from 'src/modules/logins/entities/login.entity';

@Entity('users')
export class User {
	@ApiProperty()
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column({ length: 60, type: 'varchar' })
	firstName: string;

	@ApiProperty()
	@Column({ length: 60, type: 'varchar' })
	lastName: string;

	@ApiProperty()
	@Column({ length: 255, type: 'varchar' })
	avatarUrl: string;

	@BeforeInsert()
	setFullName() {
		this.fullName = `${this.firstName} ${this.lastName}`;
	}

	@ApiProperty()
	@Column({ length: 120, type: 'varchar' })
	fullName: string;

	@ApiProperty()
	@Column({ length: 30, type: 'varchar', unique: true })
	email: string;

	@ApiProperty()
	@Column({ type: 'date' })
	birthDate: Date;

	@ApiProperty()
	@Column({ length: 60, type: 'varchar' })
	city: string;

	@OneToOne(() => Login, (login) => login.user)
	login: Login;
}
