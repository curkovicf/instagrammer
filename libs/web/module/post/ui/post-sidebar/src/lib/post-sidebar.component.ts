import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from '@instagrammer/web/shared/ui/text-area';
import { TextAreaRichComponent } from '@instagrammer/web/shared/ui/text-area-rich';
import { InputLocationComponent } from '@instagrammer/web/shared/ui/input-location';
import { CollapsableComponent } from '@instagrammer/web/shared/ui/collapsable';

@Component({
  selector: 'ng-inst-post-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TextAreaComponent,
    TextAreaRichComponent,
    InputLocationComponent,
    CollapsableComponent,
  ],
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
})
export class PostSidebarComponent {
  @Output()
  public oncaptionchange: EventEmitter<string> = new EventEmitter();
}
