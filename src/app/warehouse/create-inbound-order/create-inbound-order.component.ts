import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';
@Component({
  selector: 'app-create-inbound-order',
  templateUrl: './create-inbound-order.component.html',
  styleUrls: ['./create-inbound-order.component.scss'],
})

export class CreateInboundOrderComponent {
  loading = false;

  inboundOrderForm = this.formBuilder.group({
    supplier: [''],
    expectedDeliveryDate: [],
  });

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private messageService: MessageService) {
  }


  public createInboundOrder () :void {
    console.log(this.inboundOrderForm.value);
  }
}
