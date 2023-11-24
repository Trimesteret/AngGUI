import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUsersComponent } from './create-edit-users.component';

describe('CreateEditUsersComponent', () => {
  let component: CreateEditUsersComponent;
  let fixture: ComponentFixture<CreateEditUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditUsersComponent]
    });
    fixture = TestBed.createComponent(CreateEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
