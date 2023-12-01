import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemType } from '../../shared/enums/item-type';
import { WineType } from '../../shared/enums/wine-type';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { SuitableFor } from '../../shared/enums/Suitable-for';
import { LiquorType } from '../../shared/enums/Liquor-type';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  selectedItemType: ItemType = ItemType.DefaultItem;
  suitables = new FormControl('');
  loading = true;
  editingItem = false;
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
      alcoholPercentage: [item?.alcoholPercentage ? item.alcoholPercentage : null],
      country: [item?.country ? item.country : ''],
      region: [item?.region ? item.region : ''],
      grapeSort: [item?.grapeSort ? item.grapeSort : ''],
      winery: [item?.winery ? item.winery : ''],
      tastingNotes: [item?.tastingNotes ? item.tastingNotes : ''],
      suitableFor: [item?.suitableFor ? item.suitableFor : ''],
      itemType: [item?.itemType ? item.itemType : ItemType.DefaultItem],
      wineType: [item?.wineType ? item.wineType : WineType.RedWine],
      liquorType: [item?.liquorType ? item.liquorType : '']
    });

    this.itemForm.controls['itemType'].valueChanges.subscribe(value => {
      this.selectedItemType = value;
    });
  }

  //  public buildItemFromId(item: ItemDto){

  //}

  constructor(private formBuilder: FormBuilder, private itemService: ItemsService, private messageService: MessageService, private authenticationService: AuthenticationService) {
  //  if(hasIdintitle){
  //     this.buildItemFromId();
  //  } else {
  //  this.buildItemForm();
  //  }
    this.buildItemForm();
  }

  public submitItem(): void {
    const item = this.itemForm?.value as ItemDto;

    if(item == null && this.selectedItemType == null && this.itemForm?.valid == false){
      return;
    }

    const getItemPrice= this.itemForm?.get('itemPrice');
    if (getItemPrice) {
      item.price = Number(getItemPrice.value);
    }


    item.itemType = this.selectedItemType;

    this.itemService.createItem(item).subscribe(value => {
      console.log(item);
      this.messageService.show('Item created');
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
  protected readonly LiquorType = LiquorType;
  protected readonly SuitableFor = SuitableFor;
}
