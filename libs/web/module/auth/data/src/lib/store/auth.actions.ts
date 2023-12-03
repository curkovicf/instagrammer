import { createAction, props } from '@ngrx/store';
import { UserApi } from '@instagrammer/shared/data/api';

export const signInActionSuccess = createAction(
  '[Auth] Sign in success',
  props<{ loginResponseDto: UserApi.LoginResponseDto }>(),
);

export const signInActionFailed = createAction('[Auth] Sign in failed');

export const disableOneTapRouterAction = createAction('[Auth] Disable one-tap router navigation');

export const logoutAction = createAction('[Auth] logout');

export const updateAccessJwtAction = createAction(
  '[Auth] Update access JWT',
  props<{ accessJwtDto: UserApi.JwtDto }>(),
);
