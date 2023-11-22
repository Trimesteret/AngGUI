import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  public loggedIn = false;
  public loading = false;

  public cards = [
    {
      title: 'Vinsmagning',
      text: 'Vi holder gerne smagninger for firmaer, foreninger og private. De kan afholdes i butikken, eller hvor I måtte ønske det.',
      image: 'assets/vinsmagning.webp',
      link: '/webshop',
      buttonText: 'Læs mere om vinsmagning',
      buttonIcon: 'wine_bar'
    },
    {
      title: 'Tidligere Holte Vinlager',
      text: 'Holte Vinlager Aalborg’ har skiftet navn til Budolfi vin. Vi befinder os i de samme hyggelige lokaler med samme flinke personale',
      image: 'assets/holteVinlager.webp',
      link: '/webshop',
      buttonText: 'Læs mere om navneskiftet',
      buttonIcon: null
    },
    {
      title: 'Se vores store udvalg',
      text: 'Gennemgå vores store udvalg af vin på vores webshop.',
      image: 'assets/webshop.webp',
      link: '/webshop',
      buttonText: 'Gå til webshoppen',
      buttonIcon: 'webshop'
    }
  ];

  constructor(public router: Router, private authenticationService: AuthenticationService, private messageService: MessageService) {
    this.loggedIn = this.authenticationService.getLoggedIn();
  }

  public logout(): void{
    this.loading = true;
    this.messageService.show('Logging out...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    });
  }
}
