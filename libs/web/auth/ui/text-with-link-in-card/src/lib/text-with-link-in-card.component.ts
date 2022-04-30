import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ng-insta-text-with-link-in-card',
  template: `
    <ng-insta-card>
      <div class="card-content text-wrapper">
        <p class="regular-text">{{ text }}</p>
        <a [routerLink]="[url]">{{ urlText }}</a>
      </div>
    </ng-insta-card>
  `,
  styleUrls: ['./text-with-link-in-card.component.scss'],
})
export class TextWithLinkInCardComponent implements OnInit {
  @Input()
  text!: string;

  @Input()
  url!: string;

  @Input()
  urlText!: string;

  public ngOnInit(): void {
    if (!this.text || !this.url || !this.urlText) {
      throw new Error('One of the inputs is missing !');
    }
  }
}
