import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemType } from '../../shared/enums/item-type';
import { WineType } from '../../shared/enums/wine-type';
import { LiquorType } from '../../shared/enums/Liquor-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CustomEnum } from '../../shared/enums/custom-enum';
import { EnumService } from '../../shared/services/enum.service';

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


  constructor(private formBuilder: FormBuilder, private itemService: ItemsService, private messageService: MessageService,
              private authenticationService: AuthenticationService, private route: ActivatedRoute, private location: Location,
              private enumService: EnumService, private router: Router)
  {
    this.getItemAndBuildForm();
    this.enumService.getSuitableForEnums().subscribe(customEnums => {
      this.suitableForEnums = customEnums;
    });
  }


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
      item.suitableForEnumIds = item.suitableForEnums.flatMap(x => item.suitableForEnums?.includes(x) ? [x.id] : []);
      this.buildItemForm(item);
      this.editing = true;
      this.loading = false;
    });
  }

  public buildItemForm(item?: ItemDto): void {
    this.itemForm = this.formBuilder.group({
      name: [item?.name ? item?.name : '', Validators.required],
      EAN: [item?.ean ? item?.ean : '', Validators.required],
      description: [item?.description ? item?.description : '', Validators.required],
      price: [item?.price ? item?.price : '', [Validators.required]],
      quantity: [item?.quantity ? item?.quantity : '', [Validators.required]],
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
      wineType: [item ? Number.isInteger(item?.wineType) ? item?.wineType : WineType.RedWine : WineType.RedWine],
      liquorType: [item ? Number.isInteger(item?.liquorType) ? item?.liquorType : LiquorType.Rum : LiquorType.Rum]
    });

    this.selectedItemType = item?.itemType;

    this.itemForm.controls['itemType'].valueChanges.subscribe(value => {
      this.selectedItemType = value;
    });
  }

  public submitItem(): void {
    const item = this.itemForm?.value as ItemDto;

    if(item == null && this.selectedItemType == null && this.itemForm?.valid == false){
      return;
    }

    const itemPriceString= this.itemForm?.get('itemPrice');
    if (itemPriceString) {
      item.price = Number(itemPriceString.value);
    }

    if (this.editing) {
      item.id = parseInt(this.route.snapshot.params['id']);
      console.log(item);
      this.itemService.editItem(item).subscribe(item => {
        item.suitableForEnumIds = item.suitableForEnums.flatMap(x => item.suitableForEnums?.includes(x) ? [x.id] : []);
        this.buildItemForm(item);
        this.messageService.show('Item edited');
      }, error => {
        this.messageService.showError(error);
      });
    } else {
      this.itemService.createItem(item).subscribe(item => {
        this.router.navigate(['/warehouse/edit-item/' + item.id]);
        this.messageService.show('Item created');
      }, error => {
        this.messageService.showError(error);
      });
    }
  }

  public deleteItem(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.itemService.deleteItem(id).subscribe(res => {
      if(!res) {
        this.messageService.show('Something went wrong deleting this item');
        this.loading = false;
        return;
      }

      this.messageService.show('User deleted');
      this.location.back();
      this.loading = false;
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
}


