import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestionsComponent } from './suggestions.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SuggestionsComponent],
  exports: [SuggestionsComponent],
})
export class SuggestionsModule {}
