import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemType } from '../../shared/enums/item-type';
import { WineType } from '../../shared/enums/wine-type';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  selectedItemType: ItemType = ItemType.DefaultItem;
  wineType = 'something';
  suitables = new FormControl('');
  suitablesList: string[] = ['Dessert', 'Fisk', 'Havregrød'];
  loading = true;

  itemForm: FormGroup | undefined;

  public buildItemForm(item?: ItemDto): void {
    this.itemForm = this.formBuilder.group({
      itemName: [item?.name ? item.name : '', Validators.required],
      EAN: [item?.ean ? item.ean : '', Validators.required],
      itemDescription: [item?.description ? item.description : '', Validators.required],
      itemPrice: [item?.price ? item.price : '', [Validators.required]],
      itemQuantity: [item?.quantity ? item.quantity : '', [Validators.required]],
      year: [item?.year ? item.year : null],
      volume: [item?.volume ? item.volume : null],
      alcoholPercentage: [item?.alcohol ? item.alcohol : null],
      country: [item?.country ? item.country : ''],
      grapesort: [item?.grapesort ? item.grapesort : ''],
      suitables: [item?.suitables ? item.suitables : ''],
      itemType: [item?.itemType ? item.itemType : ItemType.DefaultItem],
      liqourType: [item?.liqourType ? item.liqourType : '']
    });

    this.itemForm.controls['itemType'].valueChanges.subscribe(value => {
      this.selectedItemType = value;
    });
  }

  constructor(private formBuilder: FormBuilder, private itemService: ItemsService, private messageService: MessageService, private authenticationService: AuthenticationService) {
    this.buildItemForm();
  }

  public submitItem(): void {
    const item = this.itemForm?.value as ItemDto;

    if(item == null && this.selectedItemType == null && this.itemForm?.valid == false){
      return;
    }

    item.itemType = this.selectedItemType;
    this.itemService.createItem(item).subscribe(value => {
      console.log(value);
    }, () => {
      console.log('error');

    });
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }

  protected readonly ItemType = ItemType;
  protected readonly WineType = WineType;
}
