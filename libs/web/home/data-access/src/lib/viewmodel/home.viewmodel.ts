import { ComponentStore } from '@ngrx/component-store';
import { IToolbarItem } from '@instagrammer/web/home/feature/toolbar';
import { Observable } from 'rxjs';

export interface HomeState {
  activeToolbarItem: IToolbarItem | null;
}

export interface HomeStateView {
  activeToolbarItem: IToolbarItem | null;
}

export class HomeViewModel extends ComponentStore<HomeState> {
  public vm$: Observable<HomeStateView> = this.select(state => ({
    activeToolbarItem: state.activeToolbarItem,
  }));

  constructor() {
    super({
      activeToolbarItem: null,
    });
  }

  public setActiveToolbarItem(activeToolbarItem: IToolbarItem): void {
    this.patchState({ activeToolbarItem });

    console.log(activeToolbarItem);
  }
}
