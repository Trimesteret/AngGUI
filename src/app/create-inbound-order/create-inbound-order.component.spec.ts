import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateInboundOrderComponent } from "./create-inbound-order.component";

describe("CreateInboundOrderComponent", () => {
	let component: CreateInboundOrderComponent;
	let fixture: ComponentFixture<CreateInboundOrderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CreateInboundOrderComponent]
		});
		fixture = TestBed.createComponent(CreateInboundOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
