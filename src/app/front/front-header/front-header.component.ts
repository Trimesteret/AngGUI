import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.scss']
})
export class FrontHeaderComponent {

  constructor(public router: Router) {
  }
}
