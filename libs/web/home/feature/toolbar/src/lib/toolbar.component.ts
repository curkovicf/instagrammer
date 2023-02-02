import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarItemName, ToolbarViewModel } from '@instagrammer/web/home/data';

@Component({
  selector: 'ng-inst-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public toolbarItemName = ToolbarItemName;

  constructor(public readonly router: Router, public readonly toolbarViewModel: ToolbarViewModel) {}
}
