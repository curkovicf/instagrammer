import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IToolbarItem } from '@instagrammer/web/home/data-access';
import { Observable } from 'rxjs';

export interface IToolbarState {
  activeToolbarItem: IToolbarItem | null;

  isBigToolbar: boolean;
}

export interface IToolbarStateView {
  activeToolbarItem: IToolbarItem | null;

  isBigToolbar: boolean;
}

@Injectable()
export class ToolbarViewModel extends ComponentStore<IToolbarState> {
  public vm$: Observable<IToolbarStateView> = this.select(state => ({
    activeToolbarItem: state.activeToolbarItem,
    isBigToolbar: state.isBigToolbar,
  }));

  constructor() {
    super({
      activeToolbarItem: null,
      isBigToolbar: false,
    });
  }
}
