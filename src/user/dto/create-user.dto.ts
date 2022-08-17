import { IsEmail, Length, MinLength } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validation/UniuqueValidation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @MinLength(5)
  fullName: string;

  /*   @UniqueOnDatabase(UserEntity, { message: 'Email exists!' }) */
  @IsEmail(undefined, { message: 'Email is not correct!' })
  email: string;

  @Length(6, 48, { message: 'Min 6 max 48' })
  password?: string;
}
