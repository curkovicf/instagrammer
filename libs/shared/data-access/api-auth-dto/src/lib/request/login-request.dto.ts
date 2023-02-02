import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { IsFieldDefined } from '@instagrammer/api-shared-util-validator';

//  FIXME: Add namespace

export class LoginRequestDto {
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
