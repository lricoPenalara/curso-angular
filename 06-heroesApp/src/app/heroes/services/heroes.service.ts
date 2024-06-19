import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
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

  // Consultar héroe
  getSuggestions( query: string ): Observable<Hero[]> {

    const url_consulta:string = `${ this.baseUrl }/heroes?q=${ query }&_limit=6`;

    return this.http.get<Hero[]>(url_consulta);

  }

  // Añadir héroe
  addHero( hero: Hero ): Observable<Hero> {

    const url_añadir:string = `${ this.baseUrl }/heroes`;

    return this.http.post<Hero>(url_añadir, hero);
  }

  // Modificar parcialmente un héroe (no el registro entero)
  updateHero( hero: Hero ): Observable<Hero> {

    const url_actualizar:string = `${ this.baseUrl }/heroes/${ hero.id }`;

    if( !hero.id ) throw Error('Hero id is required');

    return this.http.patch<Hero>(url_actualizar, hero);
  }

  // Eliminar héroe
  deleteHeroById( id: string ): Observable<boolean> {

    const url_actualizar:string = `${ this.baseUrl }/heroes/${ id }`;

    return this.http.delete<Hero>(url_actualizar)
     .pipe(
      map(resp => true),
      catchError( err => of(false) ),
     );
  }

}
