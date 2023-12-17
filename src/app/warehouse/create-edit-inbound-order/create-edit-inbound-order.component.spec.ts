import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditInboundOrderComponent } from './create-edit-inbound-order.component';

describe('CreateEditInboundOrderComponent', () => {
  let component: CreateEditInboundOrderComponent;
  let fixture: ComponentFixture<CreateEditInboundOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditInboundOrderComponent]
    });
    fixture = TestBed.createComponent(CreateEditInboundOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
