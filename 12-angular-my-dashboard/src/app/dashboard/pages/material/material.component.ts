import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'app-material',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './material.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MaterialComponent {

}
