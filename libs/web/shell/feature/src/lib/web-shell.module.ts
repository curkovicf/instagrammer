import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { shellRoutes } from './web-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(shellRoutes)],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class WebShellModule {}
