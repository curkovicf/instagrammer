import { Component } from '@angular/core';
import { CreatePostStep, CreatePostViewModel } from '@instagrammer/web/module/post/data';

@Component({
  selector: 'ng-inst-create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public createPostStep = CreatePostStep;

  constructor(public readonly createPostViewModel: CreatePostViewModel) {}
}
