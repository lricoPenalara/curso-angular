import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';

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

    // Si no la region no viene devolver un string vacío
    if ( !region ) return of([]);

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
    .pipe(
      tap( response => console.log({ response }) )
    )

  }

}
