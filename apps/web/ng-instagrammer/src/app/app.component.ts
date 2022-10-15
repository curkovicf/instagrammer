import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'instagrammer-root',
  template: `<ng-inst-layout></ng-inst-layout>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly title: Title) {
    this.title.setTitle('Instagram');
  }
}
