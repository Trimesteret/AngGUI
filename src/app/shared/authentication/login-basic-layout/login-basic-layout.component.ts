import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-basic-layout',
  templateUrl: './login-basic-layout.component.html',
  styleUrls: ['./login-basic-layout.component.scss']
})
export class LoginBasicLayoutComponent {
  @Input() title = '';
  @Input() loading = false;
  @Input() page = '';
  @Input() form: FormGroup = new FormGroup({});
  @Output() submitAuth = new EventEmitter();
}
