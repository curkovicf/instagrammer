import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PostCaptionComponent } from '../../../post-caption/src/lib/post-caption.component';

@Component({
  selector: 'ng-inst-image-info',
  standalone: true,
  imports: [CommonModule, PostCaptionComponent, NgOptimizedImage],
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.scss'],
})
export class ImageInfoComponent {
  @Input()
  set imageFile(imageFile: File | undefined) {
    if (!imageFile) {
      throw new Error('Please provide image !');
    }

    this._imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageFile));
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  _imageUrl!: SafeUrl;
}
