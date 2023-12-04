import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserComponent } from './edit-user.component';

describe('CreateEditUserComponent', () => {
  let component: CreateEditUserComponent;
  let fixture: ComponentFixture<CreateEditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditUserComponent]
    });
    fixture = TestBed.createComponent(CreateEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
