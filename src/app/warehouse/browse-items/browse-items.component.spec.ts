import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseItemsComponent } from './create-item.component';

describe('CreateItemsComponent', () => {
  let component: BrowseItemsComponent;
  let fixture: ComponentFixture<BrowseItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseItemsComponent]
    });
    fixture = TestBed.createComponent(BrowseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
