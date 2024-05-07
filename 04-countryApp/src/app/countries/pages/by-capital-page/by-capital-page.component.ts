import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [

  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) {}

  searchByCapital( capital: string ): void {
    this.countriesService.searchCapital( capital )
    //necesito el subscribe para recibir notificaciones
      .subscribe( countries =>  {
          this.countries = countries;
      });
  }

}
