import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'AUTH_FEATURE';

const initialAuthState: AuthState = {
  username: null,
  isOneTapRouterEnabled: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.signInActionSuccess, (state, { loginResponseDto }) => ({
    ...loginResponseDto,
    isOneTapRouterEnabled: true,
  })),
  on(AuthActions.signInActionFailed, state => ({
    username: null,
    isOneTapRouterEnabled: false,
  })),
  on(AuthActions.disableOneTapRouterAction, state => ({
    ...state,
    isOneTapRouterEnabled: false,
  })),
  on(AuthActions.logoutAction, state => ({
    username: null,
    isOneTapRouterEnabled: false,
  })),
);
