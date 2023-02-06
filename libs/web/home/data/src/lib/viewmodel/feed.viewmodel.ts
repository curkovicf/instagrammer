import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IFeedState {
  items: any[];
}

@Injectable({
  providedIn: 'root',
})
export class FeedViewModel extends ComponentStore<IFeedState> {
  // public vm$: Observable<IFeedState> = this.select(state => ({}));

  constructor() {
    super({
      items: [],
    });
  }
}
