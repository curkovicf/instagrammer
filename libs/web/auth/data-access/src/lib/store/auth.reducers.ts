import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH_FEATURE';

const initialAuthState: AuthState = {
  value: null,
  issuedAt: null,
  expiresAt: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, { loginResponseDto }) => ({
    ...loginResponseDto,
  })),
  on(AuthActions.logoutAction, state => ({
    value: null,
    expiresAt: null,
    issuedAt: null,
  })),
);
