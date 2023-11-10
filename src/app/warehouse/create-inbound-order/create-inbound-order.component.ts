import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-create-inbound-order',
  templateUrl: './create-inbound-order.component.html',
  styleUrls: ['./create-inbound-order.component.scss'],
})

export class CreateInboundOrderComponent {
  inboundOrderForm = new FormGroup({
    supplier: new FormControl(''),
    expectedDeliveryDate: new FormControl(),
  });
  createInboundOrder () :void {
    console.log(this.inboundOrderForm.value);
  }
}
