import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomEnum } from '../../shared/enums/custom-enum';
import { ItemsService } from '../../shared/services/items/items.service';
import { MessageService } from '../../shared/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EnumService } from '../../shared/services/enum.service';
import { EnumType } from '../../shared/enums/enum-type';

@Component({
  selector: 'app-create-edit-enum',
  templateUrl: './create-edit-enum.component.html',
  styleUrls: ['./create-edit-enum.component.scss']
})
export class CreateEditEnumComponent {
  editingEnumType: EnumType;
  loading = true;
  editing = false;
  enumForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private itemService: ItemsService, private messageService: MessageService,
              private route: ActivatedRoute, private location: Location, private enumService: EnumService, private router: Router)
  {
    this.getEnumAndBuildForm();
  }

  public getEnumAndBuildForm(): void {
    let id = null;
    const idString = this.route.snapshot.params['id'];

    id = parseInt(idString);

    if (!Number.isInteger(id)) {
      this.buildEnumForm();
      this.editing = false;
      this.loading = false;
      return;
    }

    this.enumService.getEnumById(id).subscribe(cEnum => {
      this.editing = true;
      this.buildEnumForm(cEnum);
      this.loading = false;
    });
  }

  public buildEnumForm(cEnum?: CustomEnum): void {
    this.enumForm = this.formBuilder.group({
      enumType: [cEnum ? Number.isInteger(cEnum?.enumType) ? cEnum?.enumType : null : null],
      key: [cEnum?.key ? cEnum?.key : '', Validators.required],
      value: [cEnum?.value ? cEnum?.value : '', Validators.required],
    });

    if(this.editing) {
      this.enumForm.controls['enumType'].disable();
    }

    this.editingEnumType = cEnum?.enumType;
  }

  public submitEnum(): void {
    const cEnum = this.enumForm?.value as CustomEnum;

    if(cEnum == null){
      return this.messageService.show('Ugyldig enum');
    }

    if(this.enumForm?.valid == false){
      this.messageService.show('Formen er ugyldig');
    }

    if (this.editing) {
      cEnum.id = parseInt(this.route.snapshot.params['id']);
      this.enumService.editEnum(cEnum).subscribe(customEnum => {
        this.buildEnumForm(customEnum);
        this.messageService.show('Enum redigeret');
      }, error => {
        this.messageService.showError(error);
      });
    } else {
      this.enumService.createEnum(cEnum).subscribe(customEnum => {
        this.router.navigate(['/warehouse/edit-enum/' + customEnum.id]);
        this.messageService.show('Enum oprettet');
      }, error => {
        this.messageService.showError(error);
      });
    }
  }

  public deleteEnum(): void {
    const id = this.route.snapshot.params['id'];
    this.loading = true;
    this.enumService.deleteEnum(id).subscribe(res => {
      if(!res) {
        this.messageService.show('Der gik noget galt da enum skulle slettes');
        this.loading = false;
        return;
      }

      this.messageService.show('Enum slettet');
      this.location.back();
      this.loading = false;
    });
  }

  protected readonly EnumType = EnumType;
}
