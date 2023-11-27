import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/authentication/models/user';
import { ItemDto } from '../../shared/interfaces/item-dto';
import { ItemsService } from '../../shared/services/items/items.service';

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
      year: [item?.year ? item.year : '', [Validators.required]],
      volume: [item?.volume ? item.volume : '', [Validators.required]],
      alcoholPercentage: [item?.alcohol ? item.alcohol : '', [Validators.required]],
      country: [item?.country ? item.country : '', [Validators.required]],
      grapesort: [item?.grapesort ? item.grapesort : '', [Validators.required]],
      suitables: [item?.suitables ? item.suitables : '', [Validators.required]],
      expirationDate: [item?.expirationDate ? item.expirationDate : '', [Validators.required]],
      wineType: [item?.type ? item.type : '', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buildItemForm();
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
}
