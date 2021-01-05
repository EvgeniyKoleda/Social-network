import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

import Model from 'src/utils/model';

@Entity()
export class User extends Model {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 60, type: 'varchar' })
    firstName: string;

    @Column({ length: 60, type: 'varchar' })
    lastName: string;

    @Column({ length: 120, type: 'varchar' })
    fullName: string;

    @AfterLoad()
    getFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`;
    }

    @Column({ length: 30, type: 'varchar' })
    email: string;

    @Column({ type: 'date' })
    birthDate: string;

    @Column({ length: 60, type: 'varchar' })
    city: number;
}
