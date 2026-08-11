import { IsString, IsEmail, MinLength, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'Password is too short' })
  @IsNotEmpty()
  password: string;
}