import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { enviroments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class AuthService {

    // es private pq fuera de este servicio no se puede manipular el usuario
    private baseUrl = enviroments.baseUrl;
    // va a ser nulo cuando se cargue la app por primera vez y no hay auth
    private user?: User ;

    constructor(private http: HttpClient) { }

    get currentUser():User | undefined {
        if ( !this.user ) return undefined;
        return structuredClone( this.user );
    }

    // Con structuredClone se hace una Deep Copy que establece una copia
    // de los elementos que forman parte del objeto,
    // pero omitiendo la copia de sus referencias.
    // Es decir, creando un nuevo objeto en memoria, copiando o clonando
    // su original, lo que representa un snapshoot del objeto en sí mismo
    // en un momento dado.

    login( email: string, password: string ):Observable<User> {
        //http.post('login', { email, password });
        return this.http.get<User>(`${ this.baseUrl }/users/1`)
            .pipe(
                tap( user => this.user = user ),
                tap( user => localStorage.setItem('token', 'asdasdfnaja.awdsnva.keoswdfj32' )),
            );
    }

    checkAuthentication(): Observable<boolean> {

      // si user auth regresa false
      if ( !localStorage.getItem('token') ) return of(false)

      const token = localStorage.getItem('token');

      // si user no auth regresa true
      return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( err => of(false) )
      );

      //Con !! nos aseguramos de que sea un valor booleano lo que rergesa

    }

    logout() {
      this.user = undefined;
      localStorage.clear();
    }
}
