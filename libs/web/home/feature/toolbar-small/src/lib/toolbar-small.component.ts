import { Component } from '@angular/core';
import { HomeViewModel } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'instagrammer-toolbar-small',
  templateUrl: './toolbar-small.component.html',
  styleUrls: ['./toolbar-small.component.scss'],
})
export class ToolbarSmallComponent {
  constructor(public readonly homeViewModel: HomeViewModel) {}
}
