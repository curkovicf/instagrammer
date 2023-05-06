import { createAction, props } from '@ngrx/store';
import { UserApi } from '@instagrammer/shared/data/api';

export const loginAction = createAction(
  '[Auth] Login',
  props<{ loginResponseDto: UserApi.LoginResponseDto }>(),
);

export const disableOneTapRouterAction = createAction('[Auth] Disable one-tap router navigation');

export const logoutAction = createAction('[Auth] logout');

export const updateAccessJwtAction = createAction(
  '[Auth] Update access JWT',
  props<{ accessJwtDto: UserApi.JwtDto }>(),
);
