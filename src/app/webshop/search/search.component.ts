import {Component, EventEmitter, Output} from '@angular/core';
import { WineType } from './WineType';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  public search = '';

  @Output() searchOutput = new EventEmitter<string>();
  
  wineType: WineType[] = [
    { type: 'red-0', viewType: 'Red' },
    { type: 'white-1', viewType: 'White' },
    { type: 'rose-2', viewType: 'Rose' },
  ];


  public searchChange(): void{
    this.searchOutput.emit(this.search);
  }
}
