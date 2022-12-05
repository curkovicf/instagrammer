import { Component } from '@angular/core';
import { IToolbarItem } from './toolbar.interface';

@Component({
  selector: 'ng-inst-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public toolbarItems: IToolbarItem[] = [
    {
      title: 'Home',
      iconPathDefault: '/assets/icons/icons8-home-black.svg',
      iconPathSelected: '/assets/icons/icons8-home-white.svg',
    },
  ];
}
