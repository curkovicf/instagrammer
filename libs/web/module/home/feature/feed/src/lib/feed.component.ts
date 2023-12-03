import { Component, OnInit } from '@angular/core';
import { FeedViewModel } from '@instagrammer/web/module/home/data';
import { AuthService } from '@instagrammer/web/module/auth/data';

@Component({
  selector: 'ng-inst-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(public readonly feedViewModel: FeedViewModel, private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.feedViewModel.getAll();
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
