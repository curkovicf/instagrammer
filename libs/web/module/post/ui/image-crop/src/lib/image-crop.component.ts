import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInfoComponent } from '@instagrammer/web/module/post/ui/image-info';
import Cropper from 'cropperjs';

@Component({
  selector: 'ng-inst-image-crop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
})
export class ImageCropComponent extends ImageInfoComponent implements AfterViewInit {
  @ViewChild('image')
  image!: ElementRef<HTMLImageElement>;

  public cropper!: Cropper;

  public imageDestinationUrl!: string;

  public ngAfterViewInit(): void {
    this.cropper = new Cropper(this.image.nativeElement, {
      aspectRatio: 1,
      zoomable: true,
      scalable: true,
      crop: (event: Cropper.CropEvent<HTMLImageElement>) => {
        const canvas = this.cropper.getCroppedCanvas();
        this.imageDestinationUrl = canvas.toDataURL('image/png');
      },
    });
  }
}
