import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPurchaseOrdersComponent } from './create-edit-purchase-orders.component';

describe('CreateEditPurchaseOrdersComponent', () => {
  let component: CreateEditPurchaseOrdersComponent;
  let fixture: ComponentFixture<CreateEditPurchaseOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditPurchaseOrdersComponent]
    });
    fixture = TestBed.createComponent(CreateEditPurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
