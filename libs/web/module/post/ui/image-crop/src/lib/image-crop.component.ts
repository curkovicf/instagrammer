import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Cropper from 'cropperjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ng-inst-image-crop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
})
export class ImageCropComponent implements AfterViewInit {
  @Input()
  set imageFile(imageFile: File | undefined) {
    if (!imageFile) {
      throw new Error('Please provide image !');
    }

    this._imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageFile));
  }

  @Output()
  imageCropped: EventEmitter<string> = new EventEmitter();

  @ViewChild('image')
  imageElement!: ElementRef<HTMLImageElement>;

  public cropper!: Cropper;

  public imageDestinationUrl!: string;
  _imageUrl!: SafeUrl;

  constructor(private readonly sanitizer: DomSanitizer) {}

  public ngAfterViewInit(): void {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 1,
      zoomable: true,
      scalable: true,
      crop: (event: Cropper.CropEvent<HTMLImageElement>) => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestinationUrl = canvas.toDataURL('image/png');

        this.imageCropped.next(this.imageDestinationUrl);
      },
    });
  }
}
