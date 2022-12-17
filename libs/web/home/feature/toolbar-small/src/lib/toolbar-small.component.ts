import { Component } from '@angular/core';
import { HomeViewModel, ToolbarItem, ToolbarViewModel } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'ng-inst-toolbar-small',
  templateUrl: './toolbar-small.component.html',
  styleUrls: ['./toolbar-small.component.scss'],
})
export class ToolbarSmallComponent {
  constructor(public readonly homeViewModel: HomeViewModel, public readonly toolbarViewModel: ToolbarViewModel) {}
}
