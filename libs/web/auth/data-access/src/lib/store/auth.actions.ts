import { createAction, props } from '@ngrx/store';
import { LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';

export const updateAuthStateAction = createAction(
  '[Auth] Set auth state',
  props<{ loginResponseDto: LoginResponseDto }>(),
);
