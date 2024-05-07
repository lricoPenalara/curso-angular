import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';

import { Country } from '../interfaces/country';


@Injectable({ providedIn: 'root' })
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1'

    constructor(private http: HttpClient) { }

    private getCountriesRequest( url: string ): Observable<Country[]> {
      return this.http.get<Country[]>(url)
      .pipe(
        //muestra el mensaje de error si no encuentra nada
        catchError( () => of([])),
        delay( 2000 ),
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
      return this.getCountriesRequest(url);

    }

    searchCountry( term: string ): Observable<Country[]> {

      const url = `${ this.apiUrl }/name/${ term }`;
      return this.getCountriesRequest(url);

    }

    searchRegion( term: string ): Observable<Country[]> {

      const url = `${ this.apiUrl }/region/${ term }`;
      return this.getCountriesRequest(url);

    }
}
