import { ComponentStore } from '@ngrx/component-store';
import { IToolbarItem } from '../interface/toolbar.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface HomeState {
  activeToolbarItem: IToolbarItem | null;
  toolbarItems: IToolbarItem[];
}

export interface HomeStateView {
  activeToolbarItem: IToolbarItem | null;
  toolbarItems: IToolbarItem[];
}

@Injectable()
export class HomeViewModel extends ComponentStore<HomeState> {
  public vm$: Observable<HomeStateView> = this.select(state => ({
    activeToolbarItem: state.activeToolbarItem,
    toolbarItems: state.toolbarItems,
  }));

  constructor() {
    super({
      activeToolbarItem: null,
      toolbarItems: [
        {
          title: 'Home',
          iconPathSelected: '/assets/icons/toolbar/icons8-home-selected.svg',
          iconPathDefault: '/assets/icons/toolbar/icons8-home-default.svg',
          routePath: '/home',
        },
        {
          title: 'Search',
          iconPathSelected: '/assets/icons/toolbar/icons8-search-selected.svg',
          iconPathDefault: '/assets/icons/toolbar/icons8-search-default.svg',
          routePath: '/search',
        },
      ],
    });
  }

  public setActiveToolbarItem(activeToolbarItem: IToolbarItem): void {
    this.patchState({ activeToolbarItem });
  }
}
