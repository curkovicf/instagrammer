import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeViewModel } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'ng-inst-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public readonly router: Router, public readonly homeViewModel: HomeViewModel) {}
}
