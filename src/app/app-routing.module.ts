import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateItemsComponent } from "./create-items/create-items.component";

const routes: Routes = [
	{ path: "createItems", component: CreateItemsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
