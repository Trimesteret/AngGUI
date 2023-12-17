import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemType } from '../../shared/enums/item-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CustomEnum } from '../../shared/enums/custom-enum';
import { EnumService } from '../../shared/services/enum.service';
import { EnumType } from '../../shared/enums/enum-type';

@Component({
  selector: 'app-create-edit-item',
  templateUrl: './create-edit-item.component.html',
  styleUrls: ['./create-edit-item.component.scss']
})


export class CreateEditItemComponent {
  selectedItemType: ItemType = ItemType.DefaultItem;
  loading = true;
  editing = false;
  itemForm: FormGroup | undefined;
  suitableForEnums: CustomEnum[] = [];
  wineTypeEnums: CustomEnum[] = [];
  liquorTypeEnums: CustomEnum[] = [];


  constructor(private formBuilder: FormBuilder, private itemService: ItemsService, private messageService: MessageService,
              private authenticationService: AuthenticationService, private route: ActivatedRoute, private location: Location,
              private enumService: EnumService, private router: Router)
  {
    this.getItemAndBuildForm();
    this.enumService.getAllCustomEnumsByType(EnumType.suitableFor).subscribe(customEnums => {
      this.suitableForEnums = customEnums;
    });

    this.enumService.getAllCustomEnumsByType(EnumType.wineType).subscribe(customEnums => {
      this.wineTypeEnums = customEnums;
    });

    this.enumService.getAllCustomEnumsByType(EnumType.liquorType).subscribe(customEnums => {
      this.liquorTypeEnums = customEnums;
    });
  }

  /**
   * Gets the item and builds the form
   */
  public getItemAndBuildForm(): void {
    let id = null;
    const idString = this.route.snapshot.params['id'];

    id = parseInt(idString);

    if(!Number.isInteger(id)) {
      this.buildItemForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.itemService.getItemById(id).subscribe((item) => {
      this.editing = true;
      this.buildItemForm(item);
      this.loading = false;
    });
  }

  /**
   * Builds the form given an optional item to build the form from
   * @param item the optional item
   */
  public buildItemForm(item?: ItemDto): void {
    this.itemForm = this.formBuilder.group({
      name: [item?.name ? item?.name : '', Validators.required],
      EAN: [item?.ean ? item?.ean : '', Validators.required],
      description: [item?.description ? item?.description : '', Validators.required],
      price: [item?.price ? item?.price : 0, [Validators.required]],
      quantity: [item?.quantity ? item?.quantity : 0, [Validators.required]],
      reservedQuantity: [item?.reservedQuantity ? item?.reservedQuantity : 0],
      imageUrl: [item?.imageUrl ? item?.imageUrl : '', [Validators.required]],
      year: [item?.year ? item?.year : null],
      volume: [item?.volume ? item?.volume : null],
      alcoholPercentage: [item?.alcoholPercentage ? item?.alcoholPercentage : null],
      country: [item?.country ? item?.country : ''],
      region: [item?.region ? item?.region : ''],
      grapeSort: [item?.grapeSort ? item?.grapeSort : ''],
      winery: [item?.winery ? item?.winery : ''],
      tastingNotes: [item?.tastingNotes ? item?.tastingNotes : ''],
      suitableForEnumIds: [item?.suitableForEnumIds ? item?.suitableForEnumIds : []],
      itemType: [item ? Number.isInteger(item?.itemType) ? item?.itemType : ItemType.DefaultItem : ItemType.DefaultItem],
      wineTypeEnumKey: [item?.wineTypeEnum ? item.wineTypeEnum.key : ''],
      liquorTypeEnumKey: [item?.liquorTypeEnum ? item.liquorTypeEnum.key : '']
    });

    this.selectedItemType = item ? Number.isInteger(item?.itemType) ? item?.itemType : ItemType.DefaultItem : ItemType.DefaultItem;

    if(this.editing) {
      this.itemForm.controls['itemType'].disable();
    }

    this.itemForm.controls['itemType'].valueChanges.subscribe(value => {
      this.selectedItemType = value;
    });
  }

  /**
   * The Submit of the item form
   */
  public submitItem(): void {
    const item = this.itemForm?.value as ItemDto;

    item.liquorTypeEnum = this.liquorTypeEnums.find(liquorType => liquorType.key == this.itemForm?.value?.liquorTypeEnumKey);
    item.wineTypeEnum = this.wineTypeEnums.find(wineType => wineType.key == this.itemForm?.value?.wineTypeEnumKey);

    if(this.selectedItemType == null){
      this.messageService.show('Fejl: Valgte produkt type må ikke være nul');
      return;
    }

    if(item == null){
      this.messageService.show('Fejl: Produkt må ikke være nul');
      return;
    }

    if(this.itemForm?.valid == false){
      this.messageService.show('Fejl: Produkt formen indeholder fejl');
      return;
    }

    const itemPriceString= this.itemForm?.get('itemPrice');
    if (itemPriceString) {
      item.price = Number(itemPriceString.value);
    }

    if (this.editing) {
      item.id = parseInt(this.route.snapshot.params['id']);
      return this.submitEditItem(item);
    }

    return this.submitCreateItem(item);
  }

  /**
   * Edits an item given an itemDto
   * @param item the new values of the item as an itemDto
   */
  public submitEditItem(item: ItemDto): void {
    this.itemService.editItem(item).subscribe(item => {
      this.buildItemForm(item);
      this.messageService.show('Item edited');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * Creates an item given an itemDto
   * @param item the itemDto to create
   */
  public submitCreateItem(item: ItemDto): void{
    this.itemService.createItem(item).subscribe(item => {
      this.router.navigate(['/warehouse/edit-item/' + item.id]);
      this.messageService.show('Produkt oprettet');
    }, error => {
      this.messageService.showError(error);
    });
  }

  /**
   * Deletes the item currently in editing
   */
  public deleteItem(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.itemService.deleteItem(id).subscribe(res => {
      if(!res) {
        this.messageService.show('Der gik noget galt da Produkt blev forsøgt slettet');
        this.loading = false;
        return;
      }

      this.messageService.show('Produkt slettet');
      this.location.back();
      this.loading = false;
    });
  }

  protected readonly ItemType = ItemType;
}


