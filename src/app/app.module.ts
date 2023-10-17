import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FlexModule } from "@angular/flex-layout";
import { CreateInboundOrderComponent } from "./create-inbound-order/create-inbound-order.component";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
	declarations: [
		AppComponent,
		CreateInboundOrderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatInputModule,
		FlexModule,
		MatButtonToggleModule,
		MatSidenavModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
