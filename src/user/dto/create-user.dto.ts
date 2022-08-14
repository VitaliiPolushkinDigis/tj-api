import { IsEmail, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5)
  fullName: string;

  @IsEmail(undefined, { message: 'Email is not correct!' })
  email: string;

  @Length(6, 48, { message: 'Min 6 max 48' })
  password?: string;
}
