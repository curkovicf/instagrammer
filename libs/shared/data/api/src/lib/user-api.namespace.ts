export namespace UserApi {
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
