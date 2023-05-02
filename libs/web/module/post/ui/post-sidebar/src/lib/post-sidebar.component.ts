import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from '@instagrammer/web/shared/ui/text-area';

@Component({
  selector: 'ng-inst-post-sidebar',
  standalone: true,
  imports: [CommonModule, TextAreaComponent],
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
})
export class PostSidebarComponent {}
