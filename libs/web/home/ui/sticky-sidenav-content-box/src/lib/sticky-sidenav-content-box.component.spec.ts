import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickySidenavContentBoxComponent } from './sticky-sidenav-content-box.component';

describe('StickySidenavContentBoxComponent', () => {
  let component: StickySidenavContentBoxComponent;
  let fixture: ComponentFixture<StickySidenavContentBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickySidenavContentBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StickySidenavContentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
