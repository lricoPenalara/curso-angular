import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styles: ``
})
export class UncommonPageComponent {

  // i18nSelect
  public name: string = 'Lucía';
  public gender: 'male'|'female' = 'male';
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient():void {
    this.name = 'Melisa';
    this.gender = 'female';
  }

  // i18nPlural
  public clients: string[] = ['María', 'Pedro', 'Fernando', 'Lucía', 'Eduardo', 'David', 'Helena'];
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 personas esperando.',
    'other': 'tenemos # clientes esperando.',
  }

  deleteClient():void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'Lucía',
    age: 22,
    address: 'Segovia, España'
  }

  // Async Pipe
  // Cada dos segundos emite el siguiente valor
  public myObservableTimer:Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value ) )
  );

  public promiseValue:Promise<string> = new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve( 'Tenemos data en la promesa.')
    }, 3500);
  })


}
