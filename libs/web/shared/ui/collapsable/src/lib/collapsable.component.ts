import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherIcon } from '@instagrammer/web/shared/ui/feather';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'inst-s-collapsable',
  standalone: true,
  imports: [CommonModule, FeatherModule],
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
})
export class CollapsableComponent {
  @Input()
  title = '';

  @Input()
  isOpen = false;

  @Input()
  icon: FeatherIcon = 'chevron-down';

  @Input()
  hasBottomBorder = true;

  public toggleCollapsable(): void {
    this.isOpen = !this.isOpen;
  }
}
