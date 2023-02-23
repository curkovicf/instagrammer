import { Component } from '@angular/core';
import { CreatePostViewModel } from '@instagrammer/web/module/post/data';

@Component({
  selector: 'ng-inst-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(public readonly createPostViewModel: CreatePostViewModel) {}
}
