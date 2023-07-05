import { Component, OnInit } from '@angular/core';
import { FeedViewModel } from '@instagrammer/web/module/home/data';

@Component({
  selector: 'ng-inst-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(public readonly feedViewModel: FeedViewModel) {}

  public ngOnInit(): void {
    this.feedViewModel.getAll();
  }
}
