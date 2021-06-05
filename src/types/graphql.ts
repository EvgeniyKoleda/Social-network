/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UpdateUserInput {
	firstName?: string;
	lastName?: string;
	city?: string;
	email?: string;
	birthDate?: Date;
}

export abstract class IQuery {
	abstract users(): User[] | Promise<User[]>;

	abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
	abstract updateUser(
		id?: string,
		updateUserInput?: UpdateUserInput,
	): User | Promise<User>;
}

export abstract class ISubscription {
	abstract userCreated(): User | Promise<User>;
}

export class User {
	id?: string;
	firstName?: string;
	lastName?: string;
	city?: string;
	email?: string;
	password?: string;
	login?: string;
	birthDate?: Date;
}
