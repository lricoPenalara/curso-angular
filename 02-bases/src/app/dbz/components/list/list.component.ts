import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent { 

    @Input()
    public characterList: Character[] = [{
        name: 'Trunks',
        power: 10
    }];

    // onDelete = Index value : number
    @Output()
    public onDelete: EventEmitter<string> = new EventEmitter();

    onDeleteCharacter( id?: string ):void { //id opcional
        
        if( !id ) return; //si no tiene id no hago nada

        console.log({ id });

        this.onDelete.emit( id );
    }

}
