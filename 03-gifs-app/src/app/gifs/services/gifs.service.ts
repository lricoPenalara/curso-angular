import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


/**
 * providedIn: 'root' permite a todos los servicios alcanzar todos los
 * componentes sin necesidad de importar o exportar
 */
@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:       string = 'pcT1kbHso4fGzF0s0vbV1vUdXq1mMAHz';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor ( private http: HttpClient ) {

    //Cargar los gifs anteriores la primera vez
    this.loadLocalStorage();
    console.log('Gifs Service Ready');

   }


/**
  * get tagsHistory() es para evitar que si en algún componente alguien
  * modifica directamente el tagsHistory se cambie el arreglo.
  * De esta manera, las modificaciones sólo se pueden hacer en este servicio
 */
  get tagsHistory()   {
    return [...this._tagsHistory];
  }


  //En el arreglo se guarda todo en minúscula
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    //Si el _tagsHistory incluye el tag nuevo lo elimino
    if( this._tagsHistory.includes(tag) ) {
      //Si oldTag es diferente al tag que recibo, al tag nuevo lo dejo pasar.
      this._tagsHistory = this._tagsHistory.filter( ( oldTag ) => oldTag !== tag )
    }

    //Inserta el tag nuevo al inicio
    this._tagsHistory.unshift( tag );

    //Sólo aparezcan en pantalla 10 tags
    this._tagsHistory = this._tagsHistory.splice(0,10);

    //Guarda la información en el local storage del navegador
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {

    //JSON.stringify(this.tagsHistory): convierte lo del paréntesis en string
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));

  }

  private loadLocalStorage(): void  {
    //Si no tenemos información no hace nada
    if( !localStorage.getItem('history') ) return;

    //Si hay información hace lo siguiente

    //Lo parseo a un objeto para que no sea string y se pueda guardar en el arreglo
    // (!) No es nulo, siempre va a venir un dato
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    //Si no ha info no hace nada
    if ( this._tagsHistory.length === 0 ) return;

    //Si hay info carga los gifs de la primera tag
    this.searchTag( this._tagsHistory[0] );
  }


  searchTag( tag: string ): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory( tag );

    const params =new HttpParams()
    .set( 'api_key', this.apiKey )
    .set( 'limit', '10' )
    .set( 'q', tag )

    //Observable
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
      .subscribe( resp => {

      this.gifList = resp.data;
      //console.log({ gifs: this.gifList });

      });
  }

}
