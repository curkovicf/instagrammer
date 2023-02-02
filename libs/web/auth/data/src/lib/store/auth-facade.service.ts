import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { JwtDto, LoginResponseDto } from '@instagrammer/shared/data/api';

import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  public readonly authState$ = this.store.select(AuthSelectors.selectAuthState);
  public readonly jwtToken$ = this.store.select(AuthSelectors.selectJwtToken);
  public readonly isOneTapRouterEnabled$ = this.store.select(AuthSelectors.selectIsOneTapRouterEnabled);

  constructor(private readonly store: Store) {}

  public updateAuthState(loginResponseDto: LoginResponseDto): void {
    this.store.dispatch(AuthActions.loginAction({ loginResponseDto }));
  }

  public updateAccessJwtState(accessJwtDto: JwtDto): void {
    this.store.dispatch(AuthActions.updateAccessJwtAction({ accessJwtDto }));
  }

  public disableOneTapRouter(): void {
    this.store.dispatch(AuthActions.disableOneTapRouterAction());
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logoutAction());
  }
}
