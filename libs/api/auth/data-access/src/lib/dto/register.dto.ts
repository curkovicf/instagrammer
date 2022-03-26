import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username!: string;

  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  /**
   * About regex
   * At least 1 upper case letter
   * At least 1 lower case letter
   * At least 1 number or special character
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password is too weak' })
  password!: string;
}
