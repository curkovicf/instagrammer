import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { PostApiService } from '@instagrammer/web/shared/data/api';
import { PostApi } from '@instagrammer/shared/data/api';

export enum CreatePostStep {
  ADD_IMAGE = 'ADD_IMAGE',
  IMAGE_INFO = 'IMAGE_INFO',
  IMAGE_CROP = 'IMAGE_CROP',
  SUCCESS = 'SUCCESS',
}

export interface ICreatePostState {
  isDialogOpen: boolean;
  activeStep: CreatePostStep;
  imageFileOriginal?: File;
  croppedImageFileURI?: string;
  caption: string;
  location: string;
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
    caption: state.caption,
    location: state.location,
  }));

  constructor(private readonly postApiService: PostApiService) {
    super({
      isDialogOpen: true,
      activeStep: CreatePostStep.ADD_IMAGE,
      caption: '',
      location: '',
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

  public stepToImageInfo() {
    this.patchState({ activeStep: CreatePostStep.IMAGE_INFO });
  }

  public stepBackToCropImage(): void {
    this.patchState({ activeStep: CreatePostStep.IMAGE_CROP });
  }

  public submit(): void {
    const storeData = this.get();

    const post: PostApi.Post = {
      caption: storeData.caption,
      image: <File>storeData.imageFileOriginal,
    };

    this.postApiService
      .uploadPost(post)
      .pipe(
        first(),
        tap(() => this.patchState({ activeStep: CreatePostStep.SUCCESS })),
      )
      .subscribe();
  }

  public saveCroppedImage(croppedImageFileURI: string): void {
    this.patchState({ croppedImageFileURI });
  }

  public saveCaption(description: string): void {
    this.patchState({ caption: description });
  }
}
