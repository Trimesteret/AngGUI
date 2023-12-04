import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditItemComponent } from './create-edit-item.component';

describe('CreateEditItemComponent', () => {
  let component: CreateEditItemComponent;
  let fixture: ComponentFixture<CreateEditItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditItemComponent]
    });
    fixture = TestBed.createComponent(CreateEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
