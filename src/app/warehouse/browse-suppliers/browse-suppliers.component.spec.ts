import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSuppliersComponent } from './browse-suppliers.component';

describe('BrowseSuppliersComponent', () => {
  let component: BrowseSuppliersComponent;
  let fixture: ComponentFixture<BrowseSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseSuppliersComponent]
    });
    fixture = TestBed.createComponent(BrowseSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
