import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { delay, of, switchMap, take } from 'rxjs';
import { RegisterRequestDto } from '@instagrammer/shared/data-access/api';
import { ComponentStore } from '@ngrx/component-store';

export enum ActiveView {
  baseInfo = 'baseInfo',
  dob = 'dob',
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
    registerNoDobDto: state.registerDto,
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

  public submitRegistration(dob: Date): void {
    this.registerDto$
      .pipe(
        take(1),
        delay(2000),
        switchMap(partialRegisterDto => {
          if (!partialRegisterDto) {
            return of(null);
          }

          const { email, fullName, username, password } = partialRegisterDto;

          const registerDto: RegisterRequestDto = {
            email,
            username,
            password,
            dob,
            fullName,
          };

          return (
            this.authService
              .register(registerDto)
              //
              .pipe(switchMap(() => this.authService.login({ username, password })))
          );
        }),
      )
      .subscribe();
  }
}
