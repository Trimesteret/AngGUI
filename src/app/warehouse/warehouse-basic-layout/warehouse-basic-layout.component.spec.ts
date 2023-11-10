import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseBasicLayoutComponent } from './warehouse-basic-layout.component';

describe('WarehouseBasicLayoutComponent', () => {
  let component: WarehouseBasicLayoutComponent;
  let fixture: ComponentFixture<WarehouseBasicLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseBasicLayoutComponent]
    });
    fixture = TestBed.createComponent(WarehouseBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
