import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ImageCropComponent extends ImageInfoComponent implements OnInit {
  @ViewChild('image', { static: true })
  image!: ElementRef<HTMLImageElement>;

  public cropper!: Cropper;

  public ngOnInit(): void {
    this.cropper = new Cropper(this.image.nativeElement, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      },
      autoCrop: true,
      cropBoxResizable: true,
      cropBoxMovable: true,
    });

    console.log(this.cropper);
    this.cropper.crop();
  }
}
