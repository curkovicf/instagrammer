import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostApi } from '@instagrammer/shared/data/api';

@Component({
  selector: 'ng-inst-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input({
    required: true,
  })
  public post!: PostApi.Post<string>;
}
