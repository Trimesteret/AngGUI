import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  loading = false;

  itemForm = new FormGroup({
    wineQuantity: new FormControl(),
    wineType: new FormControl(''),
    name: new FormControl(''),
    id: new FormControl()
  });

  constructor(private http: HttpClient, private messageService: MessageService, private authenticationService: AuthenticationService) {}

  submitItem(): void {
    const req = this.http.post<Item>('http://localhost:5169/api/item', { item: this.itemForm.value as Item } );
    req.subscribe(items => console.log(items));
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
