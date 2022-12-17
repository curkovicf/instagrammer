import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ToolbarItem } from '../interface/toolbar.interface';
import { Observable } from 'rxjs';

export interface IToolbarState {
  activeToolbarItem: ToolbarItem;

  isBigToolbar: boolean;
}

export interface IToolbarStateView {
  activeToolbarItem: ToolbarItem;

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
      activeToolbarItem: ToolbarItem.home,
      isBigToolbar: false,
    });
  }

  public setActiveToolbarItem(activeToolbarItem: ToolbarItem): void {
    switch (activeToolbarItem) {
      case ToolbarItem.instLogo:
        this.patchState({ activeToolbarItem: ToolbarItem.home, isBigToolbar: false });
        break;
      case ToolbarItem.home:
        this.patchState({ activeToolbarItem, isBigToolbar: false });
        break;
      case ToolbarItem.search:
        this.patchState({ activeToolbarItem, isBigToolbar: true });
        break;
    }
  }
}
