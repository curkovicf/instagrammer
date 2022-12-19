import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';
import { ToolbarItemName } from '@instagrammer/web/home/data-access';

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
    <div ngInstSmoothHover [ngClass]="{ 'icon-wrapper': !label, 'icon-wrapper-lg': !!label }" (click)="onItemClick()">
      <svg
        *ngIf="activeToolbarItem === 'home'"
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
        *ngIf="activeToolbarItem !== 'home'"
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

      <p [ngClass]="{ 'bolded-text': activeToolbarItem === 'home' }" *ngIf="label">{{ label }}</p>
    </div>
  `,
})
export class HomeIconComponent {
  @Input()
  public activeToolbarItem: ToolbarItemName | undefined;

  @Input()
  public label: string | undefined;

  @Output()
  public itemSelected: EventEmitter<ToolbarItemName> = new EventEmitter();

  public onItemClick(): void {
    this.itemSelected.emit(ToolbarItemName.home);
  }
}
