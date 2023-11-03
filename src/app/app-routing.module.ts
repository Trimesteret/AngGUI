import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front/front-page/front-page.component';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { authGuard } from './auth.guard';
import { SignupPageComponent } from './authentication/signup-page/signup-page.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'warehouse',
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
    canActivate: [authGuard]
  },
  { path: 'webshop', loadChildren: () => import('./webshop/webshop.module').then(m => m.WebshopModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
