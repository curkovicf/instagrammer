export interface TokenPairDto {
  accessToken: JwtTokenDto;
  refreshToken: JwtTokenDto;
}

export interface JwtTokenDto {
  value: string;
  expiresAt: number;
  issuedAt: number;
}
