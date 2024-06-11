import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styles: ``
})
export class BasicsPageComponent {

  public nameLower: string = 'lucía';
  public nameUpper: string = 'lucía';
  public fullName: string = 'lUcÍA riCO';

  public customDate: Date = new Date();

}
