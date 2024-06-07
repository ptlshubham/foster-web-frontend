import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesDesignTokenComponent } from './ces-design-token.component';

describe('CesDesignTokenComponent', () => {
  let component: CesDesignTokenComponent;
  let fixture: ComponentFixture<CesDesignTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CesDesignTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CesDesignTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
