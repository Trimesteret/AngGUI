import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { WineType } from '../../shared/enums/wine-type';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent {
  public userId: string | undefined;



  wine: ItemDto[] = [
    {
      id: 1,
      type: WineType.RoseWine,
      price: 200,
      ean: '',
      name: 'My-wine-1',
      quantity: 100,
      imageUrl: 'assets/PeanutNoar.jfif'
    }];
  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.userId = params['id'];
      console.log(this.userId);
    });
  }
}
