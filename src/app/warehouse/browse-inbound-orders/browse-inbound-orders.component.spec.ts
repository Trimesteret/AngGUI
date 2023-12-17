import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseInboundOrdersComponent } from './browse-inbound-orders.component';

describe('BrowseInboundOrdersComponent', () => {
  let component: BrowseInboundOrdersComponent;
  let fixture: ComponentFixture<BrowseInboundOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseInboundOrdersComponent]
    });
    fixture = TestBed.createComponent(BrowseInboundOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
