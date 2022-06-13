export interface AuthState {
  username: string | null;
  jwt: string | null;
  issuedAt: number | null;
  expiresAt: number | null;
  isOneTapRouterEnabled: boolean;
}
