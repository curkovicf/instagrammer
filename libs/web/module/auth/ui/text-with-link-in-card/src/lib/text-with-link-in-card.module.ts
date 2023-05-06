import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWithLinkInCardComponent } from './text-with-link-in-card.component';
import { CardModule } from '@instagrammer/web/shared/ui/card';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, CardModule, RouterModule],
  declarations: [TextWithLinkInCardComponent],
  exports: [TextWithLinkInCardComponent],
})
export class TextWithLinkInCardModule {}
