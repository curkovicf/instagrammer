export interface LoginResponseDto {
  jwtToken: string;
  issuedAt: number;
  expiresAt: number;
}

export interface RegisterResponseDto extends LoginResponseDto {}
