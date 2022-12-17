import { Component } from '@angular/core';
import { HomeViewModel, ToolbarItem } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'ng-inst-toolbar-small',
  templateUrl: './toolbar-small.component.html',
  styleUrls: ['./toolbar-small.component.scss'],
})
export class ToolbarSmallComponent {
  public selectedToolbarItem: ToolbarItem = ToolbarItem.home;

  constructor(public readonly homeViewModel: HomeViewModel) {}

  public onItemSelect(selectedToolbarItem: ToolbarItem): void {
    this.selectedToolbarItem = selectedToolbarItem;
  }
}
