import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ItemsService } from '../../services/items/items.service';
import { Item } from '../../warehouse/create-item/item';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public loggedIn = false;
  public loading = false;
  public items: Item[] = [];

  constructor(public router: Router, private authenticationService: AuthenticationService, private itemService: ItemsService) {
    this.loggedIn = this.authenticationService.isLoggedIn;
    this.getItems();
  }

  public getItems(): void {
    this.loading = true;
    this.itemService.getAllItems().subscribe(items => {
      console.log(items);
      this.loading = false;
    });
  }

  public logout(): void {
    this.loading = true;
    this.authenticationService.logOut().subscribe(res => {
      this.loading = false;
      window.location.reload();
    },error=>{
      this.loading = false;
      console.log(error);
    });
  }
}
