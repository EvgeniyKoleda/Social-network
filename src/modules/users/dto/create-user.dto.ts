export class CreateUserDto {
	readonly firstName: string;
	readonly lastName: string;
	readonly city: string;
	readonly email: string;
	readonly birthDate: Date;
	readonly password: string;
	readonly login: string;
}
