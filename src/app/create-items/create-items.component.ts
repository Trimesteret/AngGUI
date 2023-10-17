import { Component } from "@angular/core";

@Component({
	selector: "app-create-items",
	templateUrl: "./create-items.component.html",
	styleUrls: ["./create-items.component.scss"]
})

export class CreateItemsComponent {
	title = "AngGUI";
	inputFields = [
		{ id: "itemID", name: "Item ID" },
		{ id: "wineName", name:"Wine Name" },
		{ id: "typeOfWine", name: "What kind of wine (Red, White, Rosé ...)" },
		{ id: "amountOfWine", name: "Amount" }
	]; // naming is a little wack


	// Needs error-handling to not just use ts-ignore
	submitItem():void {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const itemID = document.querySelector("#itemID").textContent;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const wineName = document.querySelector("#wineName").textContent;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const wineType = document.querySelector("#typeOfWine").textContent;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const wineQuantity = document.querySelector("#amountOfWine").textContent;

		const data = { itemID, wineName, wineType, wineQuantity };
		const headers = new Headers({
			"Content-Type": "application/json", // Adjust the content type as needed
			// You can also add any other headers here, like authentication tokens
		});
		fetch("http://localhost:5169/api/Items", {
			method: "POST",
			mode: "cors",
			headers: headers,
			body: JSON.stringify(data)
		}).then((res) => console.log(res));
	}
}
