import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSupplierComponent } from './create-edit-supplier.component';

describe('CreateEditSupplierComponent', () => {
  let component: CreateEditSupplierComponent;
  let fixture: ComponentFixture<CreateEditSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditSupplierComponent]
    });
    fixture = TestBed.createComponent(CreateEditSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
