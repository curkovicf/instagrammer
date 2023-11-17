import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AUTH_FEATURE_KEY } from './auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsOneTapRouterEnabled = createSelector(
  selectAuthState,
  state => state?.isOneTapRouterEnabled,
);
