import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { IsFieldDefined } from '@instagrammer/shared/util/validator';

export class SignInDto {
  @IsString()
  @IsFieldDefined('email')
  username!: string;

  @IsString()
  @IsEmail()
  @IsFieldDefined('username')
  email?: string;

  @IsBoolean()
  @IsOptional()
  isLongSession?: boolean;

  /**
   * About regex
   * At least 1 upper case letter
   * At least 1 lower case letter
   * At least 1 number or special character
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password!: string;
}
