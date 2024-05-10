import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  //Subject: tipo especial de observable
  private debouncer: Subject<string> = new Subject<string>();
  //Subscription: se maneja de manera independiente
  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder: string = '';

  //valor de la caja de búsqueda inicial
  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    //El observable emite un valor
    this.debouncerSuscription = this.debouncer
    //El pipe tiene el debounceTime que es nuestro operarador
    //que dice: tienes que esperar seg para ver si no recibo más valores
    //si recibo otro valor espero seg y no emito nada y así hasta que
    //el observable deja de emitir valores por seg y se llama al subscribe
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  //cada vez que sale de la página destruye el componente
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( value: string): void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

}
