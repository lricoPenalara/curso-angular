import { Component, computed, signal } from '@angular/core';


@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styles: ``
})
export class CounterPageComponent {

  public counter = signal(10);
  public squareCounter = computed( () => this.counter() * this.counter() ); // Método de sólo lectura

  increaseBy( value: number ) {

    this.counter.update( current => current + value);
  }

}
