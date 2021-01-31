import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import config from 'src/config';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('logins')
export class Login {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 120, type: 'varchar' })
    login: string;

    @Column({ length: 120, type: 'varchar' })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, config.security.saltOrRounds);
    }

    @Column({
        name: 'userId',
    })
    userId: string

    @OneToOne(type => User, user => user.login)
    @JoinColumn()
    user: User;
}
