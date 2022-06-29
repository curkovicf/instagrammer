import { createAction, props } from '@ngrx/store';
import { JwtDto, LoginResponseDto } from '@instagrammer/shared-data-access-api-auth-dto';

export const loginAction = createAction('[Auth] Login', props<{ loginResponseDto: LoginResponseDto }>());

export const disableOneTapRouterAction = createAction('[Auth] Disable one-tap router navigation');

export const logoutAction = createAction('[Auth] logout');

export const updateAccessJwtAction = createAction('[Auth] Update access JWT', props<{ accessJwtDto: JwtDto }>());
