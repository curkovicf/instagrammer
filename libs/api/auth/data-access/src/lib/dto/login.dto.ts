import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IsFieldDefined } from '@instagrammer/api/auth/util';

export class LoginDto {
  @IsString()
  @IsFieldDefined('email')
  username!: string;

  @IsString()
  @IsEmail()
  @IsFieldDefined('username')
  email?: string;

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
