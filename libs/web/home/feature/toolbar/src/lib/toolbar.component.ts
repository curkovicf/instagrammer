import { Component } from '@angular/core';
import { IToolbarItem } from './toolbar.interface';
import { Router } from '@angular/router';
import { HomeViewModel } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'ng-inst-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public toolbarItems: IToolbarItem[] = [
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
  ];

  constructor(public readonly router: Router, public readonly homeViewModel: HomeViewModel) {}
}
