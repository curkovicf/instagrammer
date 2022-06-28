import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH_FEATURE';

const initialAuthState: AuthState = {
  username: null,
  jwt: null,
  issuedAt: null,
  expiresAt: null,
  isOneTapRouterEnabled: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginAction, (state, { loginResponseDto }) => ({
    ...loginResponseDto,
    isOneTapRouterEnabled: true,
  })),
  on(AuthActions.disableOneTapRouterAction, state => ({
    ...state,
    isOneTapRouterEnabled: false,
  })),
  on(AuthActions.logoutAction, state => ({
    username: null,
    jwt: null,
    expiresAt: null,
    issuedAt: null,
    isOneTapRouterEnabled: false,
  })),
  on(AuthActions.updateAccessJwtAction, (state, { accessJwtDto }) => ({
    ...state,
    jwt: accessJwtDto.value,
    issuedAt: accessJwtDto.issuedAt,
    expiresAt: accessJwtDto.expiresAt,
  })),
);
