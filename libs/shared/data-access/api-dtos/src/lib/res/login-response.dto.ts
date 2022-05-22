export interface LoginResponseDto {
  jwtToken: string;
  loggedInAt: number;
  expiresAt: number;
}

export interface RegisterResponseDto extends LoginResponseDto {}
