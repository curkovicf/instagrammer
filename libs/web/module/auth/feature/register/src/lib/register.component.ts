import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterViewModel } from '@instagrammer/web/module/auth/data';

@Component({
  selector: 'ng-inst-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterViewModel],
})
export class RegisterComponent {
  constructor(public readonly registerViewModel: RegisterViewModel) {}
}
