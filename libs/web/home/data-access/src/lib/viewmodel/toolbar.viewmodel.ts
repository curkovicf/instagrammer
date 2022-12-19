import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IToolbarItem, ToolbarItemName } from '../interface/toolbar.interface';
import { Observable } from 'rxjs';

export interface IToolbarState {
  activeToolbarItem: ToolbarItemName;
  isBigToolbar: boolean;
  toolbarItems: IToolbarItem[];
}

export interface IToolbarStateView {
  activeToolbarItem: ToolbarItemName;
  isBigToolbar: boolean;
  toolbarItems: IToolbarItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ToolbarViewModel extends ComponentStore<IToolbarState> {
  public vm$: Observable<IToolbarStateView> = this.select(state => ({
    activeToolbarItem: state.activeToolbarItem,
    isBigToolbar: state.isBigToolbar,
    toolbarItems: state.toolbarItems,
  }));

  constructor() {
    super({
      activeToolbarItem: ToolbarItemName.home,
      isBigToolbar: true,
      toolbarItems: [
        {
          title: 'Home',
          routerLink: '/home',
          toolbarItemName: ToolbarItemName.home,
        },
        {
          title: 'Search',
          routerLink: '/search',
          toolbarItemName: ToolbarItemName.search,
        },
      ],
    });
  }

  public setActiveToolbarItem(activeToolbarItem: ToolbarItemName): void {
    switch (activeToolbarItem) {
      case ToolbarItemName.instLogo:
        this.patchState({ activeToolbarItem: ToolbarItemName.home, isBigToolbar: true });
        break;
      case ToolbarItemName.home:
        this.patchState({ activeToolbarItem, isBigToolbar: true });
        break;
      case ToolbarItemName.search:
        this.patchState({ activeToolbarItem, isBigToolbar: false });
        break;
    }
  }
}
