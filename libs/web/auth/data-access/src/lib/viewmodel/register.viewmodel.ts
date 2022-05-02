import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export enum ActiveView {
  baseInfo = 'baseInfo',
  dob = 'dob',
}

export interface RegisterState {
  activeView: ActiveView;
  baseInfoForm: FormGroup;
  dobForm: FormGroup;
}

@Injectable()
export class RegisterViewModel extends ComponentStore<RegisterState> {
  public vm$ = this.select(s => ({
    activeView: s.activeView,
    baseInfoForm: s.baseInfoForm,
    dobForm: s.dobForm,
  }));

  constructor(private readonly formBuilder: FormBuilder) {
    super({
      activeView: ActiveView.baseInfo,
      baseInfoForm: formBuilder.group({
        phoneOrEmail: new FormControl('', [Validators.required]),
        fullName: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      }),
      dobForm: formBuilder.group({
        dob: new FormControl('', [Validators.required]),
      }),
    });
  }

  public stepToDob(): void {
    this.patchState({ activeView: ActiveView.dob });
  }

  public stepBackFromDob(): void {
    this.patchState({ activeView: ActiveView.baseInfo });
  }
}
