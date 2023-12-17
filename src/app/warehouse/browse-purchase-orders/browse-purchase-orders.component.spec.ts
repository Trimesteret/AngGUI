import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowsePurchaseOrdersComponent } from './browse-purchase-orders.component';

describe('BrowsePurchaseOrdersComponent', () => {
  let component: BrowsePurchaseOrdersComponent;
  let fixture: ComponentFixture<BrowsePurchaseOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowsePurchaseOrdersComponent]
    });
    fixture = TestBed.createComponent(BrowsePurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
