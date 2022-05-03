import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '@instagrammer/api/auth/data-access';

@Component({
  selector: 'ng-insta-base-info-register-step',
  templateUrl: './base-info-register-step.component.html',
  styleUrls: ['./base-info-register-step.component.scss'],
})
export class BaseInfoRegisterStepComponent {
  @Output()
  next: EventEmitter<RegisterDto> = new EventEmitter();

  public registerFormGroup: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.registerFormGroup = formBuilder.group({
      phoneOrEmail: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onCtaClick(): void {
    const { phoneOrEmail, fullName, username, password } = this.registerFormGroup.value;

    //  TODO: Fix proper dto types
    this.next.emit({ fullName, password, username, email: phoneOrEmail });
  }
}
