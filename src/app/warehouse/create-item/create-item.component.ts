import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/authentication/models/user';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';
import { ItemType } from '../../shared/enums/item-type';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  selected = 'something';
  wineType = 'something';
  suitables = new FormControl('');
  suitablesList: string[] = ['Dessert', 'Fisk', 'Havregrød'];

  itemForm: FormGroup | undefined;

  public buildItemForm(item?: ItemDto): void {
    this.itemForm = this.formBuilder.group({
      itemName: [item?.name ? item.name : '', Validators.required],
      EAN: [item?.ean ? item.ean : '', Validators.required],
      itemDescription: [item?.description ? item.description : '', Validators.required],
      itemPrice: [item?.price ? item.price : '', [Validators.required]],
      itemQuantity: [item?.quantity ? item.quantity : '', [Validators.required]],
      year: [item?.year ? item.year : null, [Validators.required]],
      volume: [item?.volume ? item.volume : null, [Validators.required]],
      alcoholPercentage: [item?.alcohol ? item.alcohol : null, [Validators.required]],
      country: [item?.country ? item.country : '', [Validators.required]],
      grapesort: [item?.grapesort ? item.grapesort : '', [Validators.required]],
      suitables: [item?.suitables ? item.suitables : '', [Validators.required]],
      wineType: [item?.wineType ? item.wineType : null, [Validators.required]],
      itemType: [item?.itemType ? item.itemType : null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buildItemForm();
    this.itemForm?.controls['itemType'].valueChanges.subscribe(value => {
      console.log(ItemType[value]);
      this.selected = ItemType[value];
    });
  }




  constructor(private http: HttpClient, private formBuilder: FormBuilder, private itemService: ItemsService) {}

  submitItem(): void {
    console.log(this.itemForm?.value);
    this.itemService.createItem(this.itemForm?.value).subscribe(value => {
      console.log(value);
    }, error => {
      console.log('error');

    });
  }

  protected readonly ItemType = ItemType;
}
