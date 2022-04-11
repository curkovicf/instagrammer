export interface LoginResponseDto {
  jwtToken: string;
  loggedInAt: number;
  expiresAt: number;
}
