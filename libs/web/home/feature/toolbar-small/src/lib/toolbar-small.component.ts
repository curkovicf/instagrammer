import { Component } from '@angular/core';
import { ToolbarViewModel } from '@instagrammer/web/home/data';
import { CreatePostViewModel } from '@instagrammer/web/module/post/data';

@Component({
  selector: 'ng-inst-toolbar-small',
  templateUrl: './toolbar-small.component.html',
  styleUrls: ['./toolbar-small.component.scss'],
})
export class ToolbarSmallComponent {
  constructor(
    public readonly toolbarViewModel: ToolbarViewModel,
    public readonly createPostViewModel: CreatePostViewModel,
  ) {}
}
