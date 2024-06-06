import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadSchedulerComponent } from './bulk-upload-scheduler.component';

describe('BulkUploadSchedulerComponent', () => {
  let component: BulkUploadSchedulerComponent;
  let fixture: ComponentFixture<BulkUploadSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkUploadSchedulerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkUploadSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
