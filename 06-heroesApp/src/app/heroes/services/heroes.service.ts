import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from '../../../environments/environments';


@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero []> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`)
  }


  getHeroById( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
    // Si da un error voy a regresar un observable que retorna undefined
    .pipe(
        catchError( error => of(undefined) )
    );
  }

  getSuggestions( query: string ): Observable<Hero[]> {

    const url_consulta:string = `${ this.baseUrl }/heroes?q=${ query }&_limit=6`;


    console.log("Consulta: ",url_consulta)
    return this.http.get<Hero[]>(url_consulta).pipe(
      tap(resultado=>console.log(resultado))
    );
  }

}
