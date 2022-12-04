import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'instagrammer-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss'],
})
export class ToolbarItemComponent implements OnInit {
  @Input()
  isSelected = false;

  @Input()
  iconPathDefault!: string;

  @Input()
  iconPathSelected!: string;

  @Input()
  itemTitle!: string;

  @Output()
  itemClicked: EventEmitter<void> = new EventEmitter();

  public ngOnInit(): void {
    if (!this.iconPathDefault || !this.iconPathSelected) {
      throw new Error('TOOLBAR ITEM COMPONENT: Icon is not set, please provide icon path.');
    }
  }

  @HostListener('click', [])
  onItemClick(): void {
    this.itemClicked.emit();
  }
}
