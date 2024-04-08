import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Character } from '../interfaces/character.interface';

@Injectable({
    providedIn: 'root'
})

export class DbzService {
   
    public characters: Character[] = [{
        id: uuid(),
        name: 'Krillin',
        power: 1000
    },{
        id: uuid(),
        name: 'Goku',
        power: 9500
    },
    {
        id: uuid(),
        name: 'Vegeta',
        power: 7500
    }];


    constructor(){
        console.log("Me instancio")
    }
        
    
    
    addCharacter( character: Character ): void {
        const newCharacter: Character = {  id: uuid(), ...character };

        this.characters.push(newCharacter);

    }

    // onDeleteCharacter( idx: number ): void {
    //     this.characters.splice(idx, 1);
    // }

    deleteCharacterById( id: string ): void {
        this.characters = this.characters.filter( character => character.id !== id ); 
        //La nueva lista incluirá todos los personajes excepto aquel que coincida con el id y que por tanto quiero borrar
    }
    
}