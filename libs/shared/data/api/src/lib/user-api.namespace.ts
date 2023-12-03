export namespace UserApi {
  export interface JwtDto {
    value: string;
    expiresAt: number;
    issuedAt: number;
  }

  export interface LoginResponseWrapperDto {
    accessToken: string;
    refreshToken: string;
    loginResponseDto: LoginResponseDto;
  }

  export interface LoginResponseDto {
    username: string;
  }

  export type RegisterResponseDto = LoginResponseDto;

  export interface UsernameExistsResponseDto {
    isUsernameAvailable: boolean;
    username: string;
  }
}
