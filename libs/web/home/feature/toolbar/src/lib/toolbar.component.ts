import { Component } from '@angular/core';
import { IToolbarItem } from './toolbar.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-inst-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public toolbarItems: IToolbarItem[] = [
    {
      title: 'Home',
      iconPathSelected: '/assets/icons/icons8-home-black.svg',
      iconPathDefault: '/assets/icons/icons8-home-white.svg',
      routePath: '/home',
    },
  ];

  constructor(public readonly router: Router) {}
}
