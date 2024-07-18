import { Component, Input, input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.css'
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {

    @Input()
    public price: number = 0;

    //Le pongo el dolar solo para que se vea que es un observable
    public interval$?: Subscription;

    ngOnInit(): void {
      console.log('Componente HIJO: ngOnInit');
      this.interval$ = interval(1000).subscribe( value => console.log(`Tick: ${value}`) );

    }
    ngOnChanges(changes: SimpleChanges): void {
      console.log('Componente HIJO: ngOnChanges');
      console.log({ changes });
    }
    ngOnDestroy(): void {
      console.log('Componente HIJO: ngOnDestroy');
      this.interval$?.unsubscribe();
    }


}
