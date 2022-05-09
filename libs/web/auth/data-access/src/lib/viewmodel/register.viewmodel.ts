import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { RegisterDto } from '@instagrammer/api/auth/data-access';

export enum ActiveView {
  baseInfo = 'baseInfo',
  dob = 'dob',
  confirmationCode = 'confirmationCode',
}

export interface RegisterState {
  activeView: ActiveView;
  registerDto: RegisterDto | null;
  dob: Date | null;
}

@Injectable()
export class RegisterViewModel extends ComponentStore<RegisterState> {
  public vm$ = this.select(state => ({
    activeVIew: state.activeView,
    email: state.registerDto?.email ? state.registerDto.email : null,
  }));

  constructor() {
    super({
      activeView: ActiveView.baseInfo,
      registerDto: null,
      dob: null,
    });
  }

  public stepToDob(registerDto: RegisterDto): void {
    this.patchState({
      activeView: ActiveView.dob,
      registerDto,
    });
  }

  public stepBackFromDob(): void {
    this.patchState({ activeView: ActiveView.baseInfo, dob: null });
  }

  public stepBackToDob(): void {
    this.patchState({ activeView: ActiveView.dob });
  }

  public submitForm(dob: Date): void {
    this.patchState({ dob, activeView: ActiveView.confirmationCode });
  }

  public confirmCode(confirmationCode: number): void {
    console.log('Confirmation Code ', confirmationCode);
  }
}
