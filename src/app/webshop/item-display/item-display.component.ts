import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemType } from '../../shared/enums/item-type';
import { ItemsService } from '../../shared/services/items/items.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent {
  loading = true;
  loggedIn = false;

  item: ItemDto | undefined;

  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private authenticationService: AuthenticationService,
              private messageService: MessageService) {
    this.route.params.subscribe((params) => {
      this.itemsService.getItemById(params['id']).subscribe((item) => {
        this.item = item;
        this.loading = false;
      });
    });

    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  /**
   * Get volume price
   */
  getVolumePrice(): number {
    if(this.item?.volume == undefined || this.item.volume == 0) {
      return 0;
    }
    return this.item.price / this.item.volume;
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly ItemType = ItemType;
}
