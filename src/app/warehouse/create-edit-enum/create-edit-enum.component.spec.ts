import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEnumComponent } from './create-edit-enum.component';

describe('CreateEditEnumComponent', () => {
  let component: CreateEditEnumComponent;
  let fixture: ComponentFixture<CreateEditEnumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditEnumComponent]
    });
    fixture = TestBed.createComponent(CreateEditEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
