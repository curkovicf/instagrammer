import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './web-auth-shell.routes';
import { FooterModule } from '@instagrammer/web/auth/ui/footer';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes), FooterModule],
  declarations: [LayoutComponent],
})
export class WebAuthShellModule {}
