export interface LoginResponseDto {
  username: string;
  jwt: string;
  issuedAt: number;
  expiresAt: number;
}

export type RegisterResponseDto = LoginResponseDto;
