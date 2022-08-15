import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Email is not correct!' })
  email: string;

  @Length(6, 48, { message: 'Min 6 max 48' })
  password?: string;
}
