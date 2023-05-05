import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmoothHoverModule } from '@instagrammer/web/shared/ui/smooth-hover';

@Component({
  selector: 'ng-inst-svg-post-content-icon',
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
      ngInstSmoothHover
      [ngClass]="{ 'icon-wrapper': !label, 'icon-wrapper-lg': !!label }"
      (click)="onItemClick()"
    >
      <svg
        *ngIf="isActive"
        aria-label="New post"
        class="_ab6-"
        color="rgb(38, 38, 38)"
        fill="rgb(38, 38, 38)"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="m12.003 5.545-.117.006-.112.02a1 1 0 0 0-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 0 0-.877.876L5.545 12l.007.117a1 1 0 0 0 .877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 0 0 .876.877l.117.007.117-.007a1 1 0 0 0 .876-.877l.007-.116V13h4.452l.116-.007a1 1 0 0 0 .877-.876l.007-.117-.007-.117a1 1 0 0 0-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 0 0-.876-.877ZM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1Z"
        ></path>
      </svg>

      <svg
        *ngIf="!isActive"
        aria-label="New post"
        class="_ab6-"
        color="rgb(38, 38, 38)"
        fill="rgb(38, 38, 38)"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
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
          x1="6.545"
          x2="17.455"
          y1="12.001"
          y2="12.001"
        ></line>
        <line
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          x1="12.003"
          x2="12.003"
          y1="6.545"
          y2="17.455"
        ></line>
      </svg>

      <p [ngClass]="{ 'bolded-text': isActive }" *ngIf="label">{{ label }}</p>
    </div>
  `,
})
export class AddPostIconComponent {
  @Input()
  public isActive?: boolean;

  @Input()
  public label: string | undefined;

  @Output()
  public itemSelected: EventEmitter<void> = new EventEmitter();

  public onItemClick(): void {
    this.itemSelected.emit();
  }
}
