import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemType } from '../../shared/enums/item-type';
import { WineType } from '../../shared/enums/wine-type';
import { LiquorType } from '../../shared/enums/Liquor-type';
import { SuitableFor } from '../../shared/enums/Suitable-for';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-item',
  templateUrl: './create-edit-item.component.html',
  styleUrls: ['./create-edit-item.component.scss']
})


export class CreateEditItemComponent {
  selectedItemType: ItemType = ItemType.DefaultItem;
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

  public getItemAndBuildForm(id : number): void {
    this.itemService.getItemById(id).subscribe((item) => {
      this.buildItemFormFromId(item);
    });
  }
  public buildItemFormFromId(item: ItemDto) : void {
    this.itemForm = this.formBuilder.group({
      itemName: [item.name, Validators.required],
      EAN: [item.ean, Validators.required],
      itemDescription: [item.description, Validators.required],
      itemPrice: [item.price, [Validators.required]],
      itemQuantity: [item.quantity, [Validators.required]],
      year: [item?.year], volume: [item?.volume],
      alcoholPercentage: [item?.alcoholPercentage], country: [item?.country],
      region: [item?.region], grapeSort: [item?.grapeSort],
      winery: [item?.winery], tastingNotes: [item?.tastingNotes],
      suitableFor: [item?.suitableFor],
      itemType: [item?.itemType],
      wineType: [item?.wineType],
      liquorType: [item?.liquorType]
    });
    this.selectedItemType = item.itemType;
    this.itemForm.controls['itemType'].valueChanges.subscribe(value => {
      this.selectedItemType = value;
    });
  }
  constructor(private formBuilder: FormBuilder, private itemService: ItemsService, private messageService: MessageService, private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    let itemId = this.route.snapshot.params['id'];
    itemId = parseInt(itemId);
    if(Number.isInteger(itemId)) {
      this.editingItem = true;
      this.getItemAndBuildForm(itemId);
    } else {
      this.buildItemForm();
    }
    this.loading = false;
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
    if (this.editingItem) {
      item.id = parseInt(this.route.snapshot.params['id']);
      this.itemService.editItem(item).subscribe(value => {
        this.messageService.show('Item edited');
      }, () => {
        console.log('error');
      });
    } else {
      this.itemService.createItem(item).subscribe(value => {
        this.messageService.show('Item created');
      }, () => {
        console.log('error');
      });
    }
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


