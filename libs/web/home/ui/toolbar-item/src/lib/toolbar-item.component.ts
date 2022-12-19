import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ToolbarItemName } from '@instagrammer/web/home/data-access';

@Component({
  selector: 'ng-inst-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss'],
})
export class ToolbarItemComponent {
  @Input()
  isSelected = false;

  @Input()
  itemTitle!: string;

  @Input()
  itemName!: ToolbarItemName;

  @Output()
  itemClicked: EventEmitter<ToolbarItemName> = new EventEmitter();

  @HostListener('click', [])
  onItemClick(): void {
    this.itemClicked.emit(this.itemName);
  }
}
