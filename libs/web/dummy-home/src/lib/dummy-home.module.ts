import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyHomeComponent } from './dummy-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DummyHomeComponent,
      },
    ]),
  ],
  declarations: [DummyHomeComponent],
  exports: [DummyHomeComponent],
})
export class DummyHomeModule {}
