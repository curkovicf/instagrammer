import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routes';
import { InputModule } from '@instagrammer/web/shared/ui/input';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(loginRoutes), InputModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
