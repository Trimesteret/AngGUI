import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginBasicLayoutComponent } from './login-basic-layout/login-basic-layout.component';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FrontModuleModule } from '../front/front.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RouterLink } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginBasicLayoutComponent,
    SignupPageComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FrontModuleModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    RouterLink,
    ExtendedModule
  ]
})
export class AuthenticationModule { }
