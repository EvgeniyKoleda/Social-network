
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    birthDate: Date;
    password: string;
    login: string;
    avatar?: Upload;
}

export class UpdateUserInput {
    firstName?: string;
    lastName?: string;
    city?: string;
    email?: string;
    birthDate?: Date;
}

export class File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export abstract class IMutation {
    abstract login(login: string, password: string): LoginData | Promise<LoginData>;

    abstract signup(userData?: CreateUserInput): User | Promise<User>;

    abstract file(file?: Upload): User | Promise<User>;

    abstract resetPassword(email: string): ResetPasswordResponse | Promise<ResetPasswordResponse>;

    abstract updateUser(id?: string, updateUserInput?: UpdateUserInput): User | Promise<User>;
}

export class LoginData {
    accessToken?: string;
    expiresIn?: number;
}

export class ResetPasswordResponse {
    id?: string;
}

export class Login {
    id?: string;
    password?: string;
    login?: string;
    userId?: string;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}

export class User {
    id?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    city?: string;
    email?: string;
    password?: string;
    login?: Login;
    birthDate?: Date;
}

export type Upload = any;
