import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserApi } from '@instagrammer/shared/data/api';

import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  public readonly authState$ = this.store.select(AuthSelectors.selectAuthState);
  public readonly isOneTapRouterEnabled$ = this.store.select(AuthSelectors.selectIsOneTapRouterEnabled);

  constructor(private readonly store: Store) {}

  public successSignIn(loginResponseDto: UserApi.LoginResponseDto): void {
    this.store.dispatch(AuthActions.signInActionSuccess({ loginResponseDto }));
  }

  public failedSignIn(): void {
    this.store.dispatch(AuthActions.signInActionFailed());
  }

  public disableOneTapRouter(): void {
    this.store.dispatch(AuthActions.disableOneTapRouterAction());
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logoutAction());
  }
}
