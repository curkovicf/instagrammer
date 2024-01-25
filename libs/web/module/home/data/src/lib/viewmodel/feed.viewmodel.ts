import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { PostApiService } from '@instagrammer/web/shared/data/api';
import { first, Observable, tap } from 'rxjs';
import { PostApi } from '@instagrammer/shared/data/api';

export interface IFeedState {
  posts: PostApi.Post<string>[];
}

@Injectable({
  providedIn: 'root',
})
export class FeedViewModel extends ComponentStore<IFeedState> {
  public vm$: Observable<IFeedState> = this.select(state => ({
    posts: state.posts,
  }));

  constructor(private readonly postApiService: PostApiService) {
    super({
      posts: [],
    });
  }

  public getAll(): void {
    const user = '3060af02-6358-41f8-8140-b6825164eb4f';

    this.postApiService
      .getMany(user)
      .pipe(
        first(),
        tap(posts => {
          console.log(posts);
          this.patchState({ posts });
        }),
      )
      .subscribe();
  }
}
