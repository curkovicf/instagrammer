import { createAction, props } from '@ngrx/store';
import { LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';

export const loginAction = createAction(
  '[Auth] Login',
  props<{ loginResponseDto: LoginResponseDto }>(),
);

export const logoutAction = createAction('[Auth] logout');
