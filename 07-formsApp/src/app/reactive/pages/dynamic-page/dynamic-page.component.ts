import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
    templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

    // public myForm2 = new FormGroup({
    //     favoriteGames: new FormArray([])
    // });

    public myForm: FormGroup = this.fb.group({
        name: ['', [ Validators.required, Validators.minLength(3) ]],
        favoriteGames: this.fb.array([
            ['Metal Gear', Validators.required ],
            ['Death Stranding', Validators.required ],
        ])
    });

    public newFavorite: FormControl = new FormControl( '', Validators.required) ;

    constructor(
      private fb: FormBuilder,
      private validatorsService: ValidatorsService
    ){}

    get favoriteGames() {
        return this.myForm.get('favoriteGames') as FormArray;
    }

    // Comprueba si en el campo hay errores cuando toca
    isValidField( field: string ): boolean | null {
      return this.validatorsService.isValidField( this.myForm, field );
    }

   // index: elemento que esta fallando o ha sido tocado
   isValidFieldInArray( formArray: FormArray, index: number ) {
      return formArray.controls[index].errors
        && formArray.controls[index].touched;
   }

   getFieldError( field: string ): string | null {

        // Si el form no tiene ese campo no regreso nada
        if ( !this.myForm.controls[field] ) return null;

        // Si el form si tiene el campo
        // || {} => Si errors es nulo regresa un objeto vacío
        const errors = this.myForm.controls[field].errors || {};

        for ( const key of Object.keys(errors) ) {
            switch( key ) {
                case 'required':
                return 'Este campo es requerido';

                case 'minlength':
                return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
            }

        }
        return null;
    }

    onAddToFavorites():void {

      // Si el campo esta vacío no regresa nada
      if (this.newFavorite.invalid ) return;

      //Si el campo tiene algo:
      //Constante con el nuevo juego
      const newGame = this.newFavorite.value;

      // Insertar el nuevo juego en el Arreglo favoriteGames
      // this.favoriteGames.push( new FormControl( newGame, Validators.required ) );
      this.favoriteGames.push(
        this.fb.control( newGame, Validators.required )
      );

      //Una vez se guarda, reestablecer el campo agregar
      this.newFavorite.reset();

    }

    onDeleteFavorite( index:number ):void {
      this.favoriteGames.removeAt(index);
    }

    onSubmit():void {

        if ( this.myForm.invalid ){
            this.myForm.markAllAsTouched();
            return;
        }
        console.log(this.myForm.value);
        (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
        this.myForm.reset();
    }
}
