import { Component } from '@angular/core';
import { ToolbarViewModel } from '@instagrammer/web/home/data';
import { CreatePostViewModel } from '@instagrammer/web/module/post/data';

@Component({
  selector: 'ng-inst-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(
    public readonly toolbarViewModel: ToolbarViewModel,
    public readonly createPostViewModel: CreatePostViewModel,
  ) {}
}
