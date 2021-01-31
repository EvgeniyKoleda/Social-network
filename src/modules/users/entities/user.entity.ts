import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToOne } from 'typeorm';

import { Login } from 'src/modules/logins/entities/login.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, type: 'varchar' })
    firstName: string;

    @Column({ length: 60, type: 'varchar' })
    lastName: string;

    @BeforeInsert()
    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

    @Column({ length: 120, type: 'varchar' })
    fullName: string;

    @Column({ length: 30, type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @Column({ length: 60, type: 'varchar' })
    city: string;

    @OneToOne(type => Login, login => login.user)
    login: Login;
}
