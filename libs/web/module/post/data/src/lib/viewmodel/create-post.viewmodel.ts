import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum CreatePostStep {
  ADD_IMAGE = 'ADD_IMAGE',
  IMAGE_INFO = 'IMAGE_INFO',
  IMAGE_CROP = 'IMAGE_CROP',
}

export interface ICreatePostState {
  isDialogOpen: boolean;
  activeStep: CreatePostStep;
  imageFileOriginal?: File;
  croppedImageFileURI?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CreatePostViewModel extends ComponentStore<ICreatePostState> {
  public readonly vm$: Observable<ICreatePostState> = this.select(state => ({
    croppedImageFileURI: state.croppedImageFileURI,
    imageFileOriginal: state.imageFileOriginal,
    isDialogOpen: state.isDialogOpen,
    activeStep: state.activeStep,
  }));

  constructor() {
    super({
      isDialogOpen: true,
      activeStep: CreatePostStep.ADD_IMAGE,
    });
  }

  public toggleDialog(): void {
    const { isDialogOpen } = this.get();

    this.patchState({ isDialogOpen: !isDialogOpen, activeStep: CreatePostStep.ADD_IMAGE });
  }

  public saveFile(imageFile: File): void {
    this.patchState({ imageFileOriginal: imageFile, activeStep: CreatePostStep.IMAGE_CROP });
  }

  public stepBackToAddImage(): void {
    this.patchState({ croppedImageFileURI: undefined, activeStep: CreatePostStep.ADD_IMAGE });
  }

  public stepToImageInfo($event: void) {
    console.log('Step to Image Info ', $event);
    this.patchState({ activeStep: CreatePostStep.IMAGE_INFO });
  }

  public stepBackToCropImage(): void {
    console.log('Step back to crop image');
    this.patchState({ activeStep: CreatePostStep.IMAGE_CROP });
  }

  public submit(): void {
    console.log('Submit');
  }

  public saveCroppedImage(croppedImageFileURI: string): void {
    this.patchState({ croppedImageFileURI });
  }
}
