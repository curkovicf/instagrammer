import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { DialogModule } from '@instagrammer/web/module/post/ui/dialog';

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [CreateComponent],
  exports: [
    CreateComponent,
  ],
})
export class CreateModule {}
