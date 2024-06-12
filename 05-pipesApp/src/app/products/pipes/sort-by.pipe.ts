import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy'
})

export class SortByPipe implements PipeTransform {

  // las comilas simples es para que también acepte un valor vacío
  // por si no ha seleccionado ningún filtro de selección al inicio p.ej
  transform( heroes: Hero[], sortBy?: keyof Hero | '' ): Hero[] {

    switch( sortBy ){

      case 'name':
        //comparo por nombre y lo ordeno alfabéticamente
        return heroes.sort( (a,b) => (a.name > b.name) ? 1 : -1 );
      case 'canFly':
        //comparo por si puede volar o no y lo ordeno alfabéticamente
        return heroes.sort( (a,b) => (a.canFly > b.canFly) ? 1 : -1 );
      case 'color':
        //comparo por color y ordeno de mayor a menor 
        return heroes.sort( (a,b) => (a.color> b.color) ? 1 : -1 );

      default:
        return heroes;

    }

  }
}
