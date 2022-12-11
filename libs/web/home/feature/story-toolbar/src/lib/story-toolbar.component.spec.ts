import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryToolbarComponent } from './story-toolbar.component';

describe('StoryToolbarComponent', () => {
  let component: StoryToolbarComponent;
  let fixture: ComponentFixture<StoryToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
