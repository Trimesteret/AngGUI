import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateInboundOrderComponent} from "./create-inbound-order/create-inbound-order.component";

const routes: Routes = [
  {path: 'create-inbound-order', component: CreateInboundOrderComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
