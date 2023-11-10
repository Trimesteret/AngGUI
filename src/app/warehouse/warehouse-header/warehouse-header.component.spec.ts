import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseHeaderComponent } from './warehouse-header.component';

describe('WarehouseHeaderComponent', () => {
  let component: WarehouseHeaderComponent;
  let fixture: ComponentFixture<WarehouseHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseHeaderComponent]
    });
    fixture = TestBed.createComponent(WarehouseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
