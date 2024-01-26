import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTypeComponent } from './model-type.component';

describe('ModelOptionsComponent', () => {
  let component: ModelTypeComponent;
  let fixture: ComponentFixture<ModelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
