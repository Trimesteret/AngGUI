import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBasicLayoutComponent } from './login-basic-layout.component';

describe('LoginBasicLayoutComponent', () => {
  let component: LoginBasicLayoutComponent;
  let fixture: ComponentFixture<LoginBasicLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginBasicLayoutComponent]
    });
    fixture = TestBed.createComponent(LoginBasicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
