import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, type: 'varchar' })
    firstName: string;

    @Column({ length: 60, type: 'varchar' })
    lastName: string;

    @Column({ length: 120, type: 'varchar' })
    fullName: string;

    @BeforeInsert()
    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

    @Column({ length: 30, type: 'varchar' })
    email: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @Column({ length: 60, type: 'varchar' })
    city: string;
}
