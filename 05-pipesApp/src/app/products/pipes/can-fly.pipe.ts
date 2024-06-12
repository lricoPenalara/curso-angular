import { Pipe, PipeTransform } from '@angular/core';

// true | canFly = 'vuela'
// false | canFly = 'no vuela'

@Pipe({
  name: 'canFly'
})

export class CanFlyPipe implements PipeTransform {

  transform( value: boolean ): 'vuela'|'no vuela' {
    return value
    //Si es true devolver vuela
    ? 'vuela'
    //Si es false devolver no vuela
    : 'no vuela';
  }
}
