import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  loggedIn = false;
  loading = false;

  basketContent = [
    {name: 'Ugandisk Vin', price: '200', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'God Gammeldags Rødvin', price: '300', imageUrl: "assets/PeanutNoar.jfif"},
    {name: 'Viktor Special', price: '15', imageUrl: "assets/PeanutNoar.jfif"}
  ];
  constructor(public router: Router, private authenticationService: AuthenticationService, private messageService: MessageService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }
  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}


