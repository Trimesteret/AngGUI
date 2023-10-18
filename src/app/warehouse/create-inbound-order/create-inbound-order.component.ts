import { Component } from '@angular/core';
@Component({
  selector: 'app-create-inbound-order',
  templateUrl: './create-inbound-order.component.html',
  styleUrls: ['./create-inbound-order.component.scss']
})
export class CreateInboundOrderComponent {

  createInboundOrder():void{
    console.log('jeg knepper din mor');
    const data = { 'Name':'vinx', 'Id':'69' };
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    fetch('http://localhost:5169/api/Wines', {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(data)
    }).then((res) => console.log(res));
  }
}
