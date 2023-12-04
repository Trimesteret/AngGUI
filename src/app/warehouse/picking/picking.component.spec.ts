import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingComponent } from './picking.component';

describe('PickingComponent', () => {
  let component: PickingComponent;
  let fixture: ComponentFixture<PickingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickingComponent]
    });
    fixture = TestBed.createComponent(PickingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
