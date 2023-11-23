import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { FrontPageComponent } from './webshop/front-pages/front-page/front-page.component';
import { LoginPageComponent } from './shared/authentication/login-page/login-page.component';
import { SignupPageComponent } from './shared/authentication/signup-page/signup-page.component';
import { ForgotPasswordComponent } from './shared/authentication/forgot-password/forgot-password.component';
import { MyProfileComponent } from './webshop/front-pages/my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [authGuard] },
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
