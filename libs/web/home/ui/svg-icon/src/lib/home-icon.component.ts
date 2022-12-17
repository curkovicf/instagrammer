import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';
import { ToolbarItem } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'ng-inst-svg-home-icon',
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
    <div class="icon-wrapper" ngInstSmoothHover (click)='onItemClick()'>
      <svg
        *ngIf="isSelected"
        aria-label="Home"
        class="_ab6-"
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"
        ></path>
      </svg>

      <svg
        *ngIf="!isSelected"
        aria-label="Home"
        class="_ab6-"
        color="#262626"
        fill="#262626"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="2"
        ></path>
      </svg>
    </div>
  `,
})
export class HomeIconComponent {
  @Input()
  public isSelected = false;

  @Output()
  public itemSelected: EventEmitter<ToolbarItem> = new EventEmitter();

  public onItemClick(): void {
    this.itemSelected.emit(ToolbarItem.home);
  }
}
