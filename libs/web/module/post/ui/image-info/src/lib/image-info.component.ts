import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PostCaptionComponent } from '@instagrammer/web/module/post/ui/post-caption';

@Component({
  selector: 'ng-inst-image-info',
  standalone: true,
  imports: [CommonModule, PostCaptionComponent, NgOptimizedImage],
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.scss'],
})
export class ImageInfoComponent {
  @Input()
  set imageURI(imageURI: string | undefined) {
    if (!imageURI) {
      throw new Error('Please provide image URI !');
    }

    this._imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageURI);
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  _imageUrl!: SafeUrl;
}
