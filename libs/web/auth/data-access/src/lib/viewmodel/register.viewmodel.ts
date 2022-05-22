import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { RegisterDto } from '@instagrammer/api/auth/data-access';
import { AuthService } from '../auth.service';
import { of, switchMap, take } from 'rxjs';

export enum ActiveView {
  baseInfo = 'baseInfo',
  dob = 'dob',
  confirmationCode = 'confirmationCode',
}

export interface RegisterNoDobDto {
  email: string;
  username: string;
  password: string;
  fullName: string;
}

export interface RegisterState {
  activeView: ActiveView;
  registerDto: RegisterNoDobDto | null;
  dob: Date | null;
}

@Injectable()
export class RegisterViewModel extends ComponentStore<RegisterState> {
  public readonly vm$ = this.select(state => ({
    activeVIew: state.activeView,
    email: state.registerDto?.email ? state.registerDto.email : null,
  }));

  private readonly registerDto$ = this.select(state => state.registerDto);

  constructor(private readonly authService: AuthService) {
    super({
      activeView: ActiveView.baseInfo,
      registerDto: null,
      dob: null,
    });
  }

  public stepToDob(registerDto: RegisterNoDobDto): void {
    this.patchState({
      activeView: ActiveView.dob,
      registerDto: { ...registerDto },
    });
  }

  public stepBackFromDob(): void {
    this.patchState({ activeView: ActiveView.baseInfo, dob: null });
  }

  public stepBackToDob(): void {
    this.patchState({ activeView: ActiveView.dob });
  }

  public submitDobForm(dob: Date): void {
    this.patchState({ dob, activeView: ActiveView.confirmationCode });

    this.registerDto$
      .pipe(
        take(1),
        switchMap(partialRegisterDto => {
          if (!partialRegisterDto) {
            return of(null);
          }

          const { email, fullName, username, password } = partialRegisterDto;

          const registerDto: RegisterDto = {
            email,
            username,
            password,
            dob,
            fullName,
          };

          return this.authService.register(registerDto);
        }),
      )
      .subscribe();
  }

  public confirmCode(confirmationCode: number): void {
    console.log('Confirmation Code ', confirmationCode);
  }
}
