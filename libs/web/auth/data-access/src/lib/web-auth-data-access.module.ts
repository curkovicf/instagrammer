import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiService } from './api/auth-api.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthApiService]
})
export class WebAuthDataAccessModule {}
