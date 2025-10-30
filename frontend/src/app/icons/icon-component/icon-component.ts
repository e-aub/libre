import { Component, inject, Input, OnChanges } from '@angular/core';
import { IconsService } from '../icons-service/icons-service';

@Component({
  selector: 'app-icon',
  template: `<span [innerHTML]="svg"></span>`,
})
export class IconComponent implements OnChanges {
  @Input() name!: string;
  svg = '';
  private iconsService = inject(IconsService);


  async ngOnChanges() {
    this.svg = await this.iconsService.getIcon(this.name);
  }
}
