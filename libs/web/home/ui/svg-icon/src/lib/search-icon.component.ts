import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';

export type SvgHomeIcon = 'svg-home-icon';

@Component({
  selector: 'ng-inst-svg-search-icon',
  standalone: true,
  imports: [CommonModule, SmoothHoverModule],
  styles: [
    `
      @import 'ng-instagrammer-mixins';

      :host {
        @include center-flex-X();

        & .icon-wrapper {
          border-radius: 5rem;
          width: 3rem;
          height: 3rem;
          cursor: pointer;
          user-select: none;
          @include center-flex-X();
        }

        & .icon-wrapper-lg {
          border-radius: 5rem;
          width: 95%;
          height: 3rem;
          cursor: pointer;
          @include center-flex-X();
          justify-content: flex-start;
          padding: 0 0.9rem;
          user-select: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

          & > p {
            margin-left: 1rem;
          }

          & > .bolded-text {
            font-weight: 500;
          }
        }
      }
    `,
  ],
  template: `
    <div
      class="icon-wrapper"
      [ngClass]="{ 'icon-wrapper': !label, 'icon-wrapper-lg': !!label }"
      ngInstSmoothHover
      (click)="onItemClick()"
    >
      <svg
        *ngIf="isActive"
        aria-label="Search"
        class="_ab6-"
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          x1="16.511"
          x2="21.643"
          y1="16.511"
          y2="21.643"
        ></line>
      </svg>

      <svg
        *ngIf="!isActive"
        aria-label="Search"
        class="_ab6-"
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
        <line
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          x1="16.511"
          x2="22"
          y1="16.511"
          y2="22"
        ></line>
      </svg>

      <p [ngClass]="{ 'bolded-text': isActive === 'search' }" *ngIf="label">{{ label }}</p>
    </div>
  `,
})
export class SearchIconComponent {
  @Input()
  public isActive?: boolean;

  @Input()
  public label?: string;

  @Output()
  public itemSelected: EventEmitter<string> = new EventEmitter();

  public onItemClick(): void {
    this.itemSelected.emit('search');
  }
}
