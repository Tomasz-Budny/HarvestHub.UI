import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDetailsHistoryComponent } from './field-details-history.component';

describe('FieldDetailsHistoryComponent', () => {
  let component: FieldDetailsHistoryComponent;
  let fixture: ComponentFixture<FieldDetailsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldDetailsHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldDetailsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
