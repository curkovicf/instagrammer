import { IsDate, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsDate()
  @IsNotEmpty()
  dob!: Date;

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
