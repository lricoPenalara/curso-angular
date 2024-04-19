import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  //Inyectamos el servicio para poder mandar el listado de gifs
  constructor( private gifsService: GifsService ) {}


  //Cogemos los gifs
  get gifs(): Gif[] {
    return this.gifsService.gifList;

  }
}
