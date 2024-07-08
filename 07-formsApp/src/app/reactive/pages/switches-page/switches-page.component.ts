import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit{

    public myForm: FormGroup = this.fb.group({
           gender: [ 'M', Validators.required ],
           wantNotifications: [false, Validators.required ],
           termsAndConditions: [ false, Validators.requiredTrue ],
    });

    public person = {
        gender: 'F',
        wantNotifications: false,
    }

    constructor(
      private fb: FormBuilder,
      private validatorsService: ValidatorsService
    ){}

    ngOnInit(): void {
        this.myForm.reset( this.person );
  }

    // Comprueba si en el campo hay errores cuando toca
    isValidField( field: string ): boolean | null {
      return this.validatorsService.isValidField( this.myForm, field );
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
            }

        }

        return null;

    }

    //ngSubmit
    onSave():void {

    if ( this.myForm.invalid ) {
        this.myForm.markAllAsTouched();
        return;
    }

    // Desestructuramos del formulario (myForm) la propiedad termsAndConditions
    // creando un nuevo objeto (newPerson) con todas las propiedades menos esa.
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    // Para que se apliquen los cambios en el html
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

    }

}
