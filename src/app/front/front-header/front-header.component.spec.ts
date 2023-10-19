import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontHeaderComponent } from './front-header.component';

describe('HomeHeaderComponent', () => {
  let component: FrontHeaderComponent;
  let fixture: ComponentFixture<FrontHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontHeaderComponent]
    });
    fixture = TestBed.createComponent(FrontHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
