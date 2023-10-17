import { Component } from "@angular/core";
@Component({
	selector: "app-create-inbound-order",
	templateUrl: "./create-inbound-order.component.html",
	styleUrls: ["./create-inbound-order.component.scss"]
})
export class CreateInboundOrderComponent {
	createInboundOrder():void{
		console.log("jeg knepper din mor");
		fetch("http://localhost:5169/api/Wines", {
			accept: JSON,
			method: "POST",
			mode: "cors",
			body: JSON.stringify( { "Name":"pik", "Id":"10000000" } )
		}).then((res) => console.log(res));
	}
}
