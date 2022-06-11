export interface JwtResponseDto {
  value: string;
  issuedAt: number;
  expiresAt: number;
}

export interface RegisterResponseDto extends JwtResponseDto {}
