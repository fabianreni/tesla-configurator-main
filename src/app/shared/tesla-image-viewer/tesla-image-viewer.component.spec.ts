import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaImageViewerComponent } from './tesla-image-viewer.component';

describe('TeslaImageViewerComponent', () => {
  let component: TeslaImageViewerComponent;
  let fixture: ComponentFixture<TeslaImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaImageViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
