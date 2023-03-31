import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ng-inst-image-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.scss'],
})
export class ImageInfoComponent {
  @Input()
  set imageFile(imageFile: File | undefined) {
    console.log(imageFile);
    if (!imageFile) {
      throw new Error('Please provide image !');
    }

    this._imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageFile));
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  _imageUrl!: SafeUrl;
}
