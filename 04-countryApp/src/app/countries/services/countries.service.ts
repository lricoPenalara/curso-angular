import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { ChacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({ providedIn: 'root' })
export class CountriesService {

  readonly NOMBRE_CACHE:string = "cacheStore";

    private apiUrl: string = 'https://restcountries.com/v3.1';



    public cacheStore: ChacheStore = {
      byCapital:   { term: '', countries: [] },
      byCountries: { term: '', countries: [] },
      byRegion:    { region: '', countries: [] }
    }

    //cuando el servicio se crea la primera vez realizamos la carga
    constructor(private http: HttpClient) {
      this.loadFromLocalStorage();
    }

    //grabar el objeto CacheStore como string
    private saveToLocalStorage() {
      localStorage.setItem( this.NOMBRE_CACHE, JSON.stringify( this.cacheStore ));
    }

    //cargar el objeto CacheStore como objeto
    private loadFromLocalStorage() {

      //Si no existe el cacheStore no hace nada
      if( !localStorage.getItem(this.NOMBRE_CACHE) ) return;

      //Si existe carga el CacheStore como string y lo parsea a objeto
      this.cacheStore = JSON.parse( localStorage.getItem(this.NOMBRE_CACHE)! );
    }

    private getCountriesRequest( url: string ): Observable<Country[]> {

      return this.http.get<Country[]>(url)
      .pipe(
        //muestra el mensaje de error si no encuentra nada
        catchError( () => of([])),
        // delay( 2000 ),
      );
    }


    searchCountryByAlphaCode( code: string ): Observable<Country | null> {

      const url = `${ this.apiUrl }/alpha/${ code }`;

        return this.http.get<Country[]>( url )
        .pipe(
          //si el arreglo de countries es mayor a 0, enotnces hay uno
          // o más y devuelve el país en la primera posición y
          // si no existe devuelve null
          map( countries => countries.length > 0 ? countries[0]: null ),
          //muestra el mensaje de error si no encuentra nada
          catchError( () => of(null))
        );
    }

    searchCapital( term: string ): Observable<Country[]> {

      const url = `${ this.apiUrl }/capital/${ term }`;
      return this.getCountriesRequest(url)
        .pipe(
          //Cuando haga la petición, grabar los datos
          tap( countries => this.cacheStore.byCapital = { term, countries}),
          tap( () => this.saveToLocalStorage())
        )

    }

    searchCountry( term: string ): Observable<Country[]> {

      const url = `${ this.apiUrl }/name/${ term }`;
      return this.getCountriesRequest(url)
        .pipe(
          //Cuando haga la petición, grabar los datos
          tap( countries => this.cacheStore.byCountries = { term, countries}),
          tap( () => this.saveToLocalStorage())
        )
    }

    searchRegion( region: Region ): Observable<Country[]> {

      const url = `${ this.apiUrl }/region/${ region }`;
      return this.getCountriesRequest(url)
        .pipe(
          //Cuando haga la petición, grabar los datos
          tap( countries => this.cacheStore.byRegion = { region, countries}),
          tap( () => this.saveToLocalStorage())
        )

    }
}
