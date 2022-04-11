import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH_FEATURE_KEY';

const initialAuthState: AuthState = {
  jwtToken: null,
  loggedInAt: null,
  expiresAt: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.updateAuthStateAction, (state, { loginResponseDto }) => ({
    ...loginResponseDto,
  })),
);
