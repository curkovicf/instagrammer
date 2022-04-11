export interface AuthState {
  jwtToken: string | null;
  loggedInAt: number | null;
  expiresAt: number | null;
}
