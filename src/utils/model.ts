import { BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';

export default class {
    [x: string]: any;

    @BeforeInsert()
    generateId() {
        if (this.id) {
            this.id = uuid();
        }
    }
}
