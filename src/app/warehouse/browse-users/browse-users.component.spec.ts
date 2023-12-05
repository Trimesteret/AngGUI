import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseUsersComponent } from './browse-users.component';

describe('BrowseUsersComponent', () => {
  let component: BrowseUsersComponent;
  let fixture: ComponentFixture<BrowseUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseUsersComponent]
    });
    fixture = TestBed.createComponent(BrowseUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
