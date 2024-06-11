import { Pipe, PipeTransform } from '@angular/core';

// lucía | toggleCase = 'LUCÍA'
// LUCÍA | toggleCase = 'lucía'


@Pipe({
  name: 'toggleCase'
})

export class ToggleCasePipe implements PipeTransform {

  transform( value: string, toUpper: boolean = false ): string {

    return ( toUpper )
    //Si está en true a mayúsculas
    ? value.toUpperCase()
    //Si no está en true a minúsculas
    : value.toLowerCase();
  }
}
