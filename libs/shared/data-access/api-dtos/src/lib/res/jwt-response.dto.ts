export interface JwtResponseDto {
  jwtToken: string;
  issuedAt: number;
  expiresAt: number;
}

export interface RegisterResponseDto extends JwtResponseDto {}
