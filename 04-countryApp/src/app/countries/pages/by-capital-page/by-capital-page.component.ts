import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [

  ]
})
export class ByCapitalPageComponent implements OnInit {

  //países que devuelve la búsqueda
  public countries: Country[] = [];
  //loader de buscando: false porque cuando inicio la página no estoy cargando
  public isLoading: boolean = false;
  //valor de la caja de búsqueda inicial
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ) {}

  //hacer persistente la información cuando se inicie esta página
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital( capital: string ): void {

    //cuando busco ya es cuando estoy cargándolo
    this.isLoading = true;

    this.countriesService.searchCapital( capital )
    //necesito el subscribe para recibir notificaciones
      .subscribe( countries =>  {
          this.countries = countries;
          this.isLoading = false;
          this.initialValue = '';
      });
  }

}
