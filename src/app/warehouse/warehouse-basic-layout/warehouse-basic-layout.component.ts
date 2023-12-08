import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'app-warehouse-basic-layout',
  templateUrl: './warehouse-basic-layout.component.html',
  styleUrls: ['./warehouse-basic-layout.component.scss']
})
export class WarehouseBasicLayoutComponent {
  @Output() loading = new EventEmitter();

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) { }

  public logout(): void{
    this.loading.emit(true);
    this.messageService.show('Logger ud...');
    this.authenticationService.logOut().subscribe(() => {
      window.location.reload();
    }, error => {
      this.messageService.showError(error);
      window.location.reload();
    });
  }
}
