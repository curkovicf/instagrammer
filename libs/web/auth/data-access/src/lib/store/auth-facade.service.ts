import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginResponseDto } from '@instagrammer/shared/data-access/api-dtos';

import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  public readonly authState$ = this.store.select(AuthSelectors.selectAuthState);
  public readonly jwtToken$ = this.store.select(AuthSelectors.selectJwtToken);

  constructor(private readonly store: Store) {}

  public updateAuthState(loginResponseDto: LoginResponseDto): void {
    this.store.dispatch(AuthActions.updateAuthStateAction({ loginResponseDto }));
  }
}
