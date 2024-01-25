import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSummaryComponent } from './config-summary.component';

describe('ConfigSummaryComponent', () => {
  let component: ConfigSummaryComponent;
  let fixture: ComponentFixture<ConfigSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
