import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInWithFacebookComponent } from './log-in-with-facebook.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LogInWithFacebookComponent],
  exports: [LogInWithFacebookComponent],
})
export class LogInWithFacebookModule {}
