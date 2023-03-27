import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtaButtonModule } from '@instagrammer/web/shared/ui/cta-button';

@Component({
  selector: 'ng-inst-add-photo',
  standalone: true,
  imports: [CommonModule, CtaButtonModule],
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss'],
})
export class AddPhotoComponent {
  @Output()
  fileLoad: EventEmitter<File> = new EventEmitter<File>();

  public loadImage(fileList: FileList | null): void {
    if (!fileList) {
      return;
    }

    const file = fileList[0];

    if (!file) {
      return;
    }

    this.fileLoad.emit(file);
  }
}
