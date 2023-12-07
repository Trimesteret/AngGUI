import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemType } from '../../shared/enums/item-type';
import { ItemsService } from '../../shared/services/items/items.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { MessageService } from '../../shared/services/message.service';
import { OrderService } from '../../shared/services/order/order.service';
import { OrderLine } from '../../shared/models/order-line';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent {
  loading = true;
  loggedIn = false;
  quantity = 1;

  item: ItemDto | undefined;

  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private authenticationService: AuthenticationService,
              private messageService: MessageService, private orderService: OrderService) {
    this.route.params.subscribe((params) => {
      this.itemsService.getItemById(params['id']).subscribe((item) => {
        this.item = item;
        this.item.volume = this.item.volume ? Math.round(this.item.volume * 100) / 100 : undefined;
        this.item.price = this.item.price ? Math.round(this.item.price * 100) / 100 : 0;
        this.item.mass = this.item.mass ? Math.round(this.item.mass * 100) / 100 : 0;
        this.loading = false;
      });
    });

    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  public addToCart(item: ItemDto): void {
    const orderLine = new OrderLine(item.id, this.quantity, item.price, item);
    this.orderService.addOrderLineToCurrentPurchaseOrder(orderLine);
  }

  /**
   * Get volume price
   */
  public getVolumePrice(): number {
    if(this.item?.volume == undefined || this.item.volume == 0) {
      return 0;
    }
    return Math.round((this.item.price / this.item.volume)*100)/100;
  }

  protected readonly ItemType = ItemType;
}
