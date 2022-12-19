import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarItemName } from '@instagrammer/web/home/data-access';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';

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
          @include center-flex-X();
        }
      }
    `,
  ],
  template: `
    <div class="icon-wrapper" ngInstSmoothHover (click)="onItemClick()">
      <svg
        *ngIf="activeToolbarItem === 'search'"
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
        *ngIf="activeToolbarItem !== 'search'"
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
    </div>
  `,
})
export class SearchIconComponent {
  @Input()
  public activeToolbarItem: ToolbarItemName | undefined;

  @Output()
  public itemSelected: EventEmitter<ToolbarItemName> = new EventEmitter();

  public onItemClick(): void {
    this.itemSelected.emit(ToolbarItemName.search);
  }
}
