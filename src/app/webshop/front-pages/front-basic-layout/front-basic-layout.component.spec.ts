import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontBasicLayoutComponent } from './front-basic-layout.component';


describe('BasicLayoutComponent', () => {
  let component: FrontBasicLayoutComponent;
  let fixture: ComponentFixture<FrontBasicLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontBasicLayoutComponent]
    });
    fixture = TestBed.createComponent(FrontBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
