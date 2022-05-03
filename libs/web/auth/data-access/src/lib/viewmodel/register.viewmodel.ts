import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { RegisterDto } from '@instagrammer/api/auth/data-access';

export enum ActiveView {
  baseInfo = 'baseInfo',
  dob = 'dob',
}

export interface RegisterState {
  activeView: ActiveView;
  registerDto: RegisterDto | null;
}

@Injectable()
export class RegisterViewModel extends ComponentStore<RegisterState> {
  public vm$ = this.select(state => ({ activeVIew: state.activeView }));

  constructor() {
    super({
      activeView: ActiveView.baseInfo,
      registerDto: null,
    });
  }

  public stepToDob(registerDto: RegisterDto): void {
    this.patchState({
      activeView: ActiveView.dob,
      registerDto,
    });
  }

  public stepBackFromDob(): void {
    this.patchState({ activeView: ActiveView.baseInfo });
  }
}
