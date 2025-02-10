import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-options-bottom-sheet',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './options-bottom-sheet.component.html',
})
export class OptionsBottomSheetComponent {

  openLink(event: MouseEvent) {
    console.log('openLink', event);
  }

}
