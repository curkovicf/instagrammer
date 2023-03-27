import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum CreatePostStep {
  ADD_IMAGE = 'ADD_IMAGE',
  IMAGE_INFO = 'IMAGE_INFO',
}

export interface ICreatePostState {
  isDialogOpen: boolean;
  activeStep: CreatePostStep;
  imageFile?: File;
}

@Injectable({
  providedIn: 'root',
})
export class CreatePostViewModel extends ComponentStore<ICreatePostState> {
  public readonly vm$: Observable<ICreatePostState> = this.select(state => ({
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
    this.patchState({ imageFile, activeStep: CreatePostStep.IMAGE_INFO });
  }
}
