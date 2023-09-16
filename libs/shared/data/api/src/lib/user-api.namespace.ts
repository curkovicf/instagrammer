import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { IsFieldDefined } from '@instagrammer/shared/util/validator';

export namespace UserApi {
  export class LoginRequestDto {
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

  export class LogoutRequestDto {
    @IsString()
    @IsNotEmpty()
    usernameOrEmail!: string;
  }

  export class RefreshJwtRequestDto {
    @IsNotEmpty()
    @IsString()
    usernameOrEmail!: string;

    @IsBoolean()
    @IsNotEmpty()
    isLongSession!: boolean;
  }

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

  export class UsernameExistsRequestDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    username!: string;
  }

  export interface JwtDto {
    value: string;
    expiresAt: number;
    issuedAt: number;
  }

  export interface JwtPairDto {
    accessToken: JwtDto;
    refreshToken: JwtDto;
  }

  export interface LoginResponseDto {
    username: string;
    jwt: string;
    issuedAt: number;
    expiresAt: number;
  }

  export interface LoginResponseWrapperDto {
    accessToken: string;
    refreshToken: string;
    loginResponseDto: LoginResponseDtoV2;
  }

  export interface LoginResponseDtoV2 {
    username: string;
  }

  export type RegisterResponseDto = LoginResponseDto;

  export interface UsernameExistsResponseDto {
    isUsernameAvailable: boolean;
    username: string;
  }
}
