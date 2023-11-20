import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WineType } from './WineType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  public search = '';
  public select = '';
  public price = '';


  @Output() searchOutput = new EventEmitter<string>();
  @Output() selectOutput = new EventEmitter<string>();
  @Output() priceFilterOutput = new EventEmitter<string>();
  @Input() wineTypes : WineType[] = [];

  public searchChange() : void {
    this.searchOutput.emit(this.search);
  }

  public selectChange() : void {
    this.selectOutput.emit(this.select);
  }

  public priceFilterChange() : void {
    this.priceFilterOutput.emit(this.price);
  }

}
