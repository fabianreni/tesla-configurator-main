import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOptionConfigComponent } from './model-option-config.component';

describe('ModelOptionsComponent', () => {
  let component: ModelOptionConfigComponent;
  let fixture: ComponentFixture<ModelOptionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelOptionConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelOptionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
