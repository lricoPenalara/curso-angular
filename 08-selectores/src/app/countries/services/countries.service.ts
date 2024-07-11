import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { combineLatest, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  // El guion bajo es para que ningun componente accidentalemente pueda
  // cambiarme mis regiones (es como algo de seguridad)
  private _regions: Region[] = [ Region.Africa, Region.Americas, Region.Asia,
                                 Region.Europe, Region.Oceania ];

  constructor(
    private http: HttpClient
  ) { }

  //Obtener Regiones
  get regions(): Region[] {
    // Lo hago así para romper la relacion que hay con las regiones
    // Si alguien modifica el arreglo no pasa nada en el arreglo original
    return [ ...this._regions ];
  }

  //Obtener Países por Region
  getCountriesByRegion( region: Region ): Observable<SmallCountry[]> {

    // Si la region no viene devolver un arreglo vacío
    if ( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [] //Si es nulo regresa un arreglo vacío
        }))),
      )
  }

  getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry> {
    const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
    .pipe(
      map( country => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [] //Si es nulo regresa un arreglo vacío
      }))
    )
  }

  getCountryBordersByCode( borders: string[] ): Observable<SmallCountry[]> {
    if ( !borders || borders.length === 0 ) return of([]);

    const countriesRequests:Observable<SmallCountry>[] = [];

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode( code );
      countriesRequests.push( request );
    });

    // Emitir hasta que todos los observables dentro del arreglo emitan un valor
    return combineLatest( countriesRequests );

  }

}
