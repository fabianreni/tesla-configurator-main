import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentNotFoundComponent } from './component-not-found.component';

describe('ErrorComponent', () => {
  let component: ComponentNotFoundComponent;
  let fixture: ComponentFixture<ComponentNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
