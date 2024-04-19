import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  //Inyectamos el servicio
  constructor( private gifsService: GifsService) { }

  //obtenemos las etiquetas que se añaden
  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  //traemos el método necesario para poder buscar los gifs
  searchTag( tag: string ) {
    this.gifsService.searchTag( tag );
  }

}
