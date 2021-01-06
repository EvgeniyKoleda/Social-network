export interface CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly city: string;
    readonly email: string;
    readonly birthDate: Date;
}
