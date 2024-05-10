import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  //países que devuelve la búsqueda
  public countries: Country[] = [];
  //loader de buscando: false porque cuando inicio la página no estoy cargando
  public isLoading: boolean = false;

  //arreglo de regiones disponibles
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  //region elegida
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ) {}

   //hacer persistente la información cuando se inicie esta página
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ): void {

    //cuando busco ya es cuando estoy cargándolo
    this.isLoading = true;

    //region elegida
    this.selectedRegion = region;

    this.countriesService.searchRegion( region )
    //necesito el subscribe para recibir notificaciones
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
