import { createAction, props } from '@ngrx/store';
import { JwtResponseDto } from '@instagrammer/shared/data-access/api-dtos';

export const loginAction = createAction(
  '[Auth] Login',
  props<{ loginResponseDto: JwtResponseDto }>(),
);

export const logoutAction = createAction('[Auth] logout');
