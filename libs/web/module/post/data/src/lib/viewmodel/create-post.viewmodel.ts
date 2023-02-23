import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ICreatePostState {
  isDialogOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CreatePostViewModel extends ComponentStore<ICreatePostState> {
  public readonly vm$: Observable<ICreatePostState> = this.select(state => ({
    isDialogOpen: state.isDialogOpen,
  }));

  constructor() {
    super({
      isDialogOpen: true,
    });
  }

  public toggleDialog(): void {
    const { isDialogOpen } = this.get();

    this.patchState({ isDialogOpen: !isDialogOpen });
  }
}
