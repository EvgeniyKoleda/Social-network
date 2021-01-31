import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';

import config from 'src/config';
import { LoginsService } from 'src/modules/logins/logins.service';
import { User } from 'src/modules/users/entities/user.entity';

export type JWTPayloadType = {
    userId: string,
};

@Injectable()
export class AuthService {
    constructor(
        private loginsService: LoginsService,
        private jwtService: JwtService,
    ) {}

    async validateUser(login: string, password: string): Promise<User | null> {
        let { user, ...loginData } = await this.loginsService.findOne({ login });

        if(!loginData) {
            return null;
        }

        let isMatchPassord = await bcrypt.compare(password, loginData.password);

        if (isMatchPassord) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        let payload: JWTPayloadType = { userId: user.id };

        return {
            access_token: this.jwtService.sign(payload),
            expiresIn: moment().add(Number(config.security.expiresIn.time), <moment.unitOfTime.DurationConstructor>config.security.expiresIn.unit),
        };
    }
}
