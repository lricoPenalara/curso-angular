import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
    name: 'RTX 5090',
    price: 2500,
    inStorage: 6,
}

@Component({
    templateUrl: './basic-page.component.html',
    styles: ``
})
export class BasicPageComponent implements OnInit {

//Las dos formas son válidas

    // public myForm: FormGroup = new FormGroup({
    //     name: new FormControl(''),
    //     price: new FormControl(0),
    //     inStorage: new FormControl(0),
    // });

    public myForm: FormGroup = this.fb.group({
        name: ['', [ Validators.required, Validators.minLength(3) ] ],
        price: [0, [ Validators.required, Validators.min(0) ] ],
        inStorage: [0, [ Validators.required, Validators.min(0) ] ],
    })

    constructor( private fb: FormBuilder ){}

    ngOnInit(): void {
        // this.myForm.reset(rtx5090);
    }

    // Comprueba si en el campo hay errores cuando toca
    isNotValidField( field: string ): boolean | null {
        return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched;
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

    onSave():void {

        if ( this.myForm.invalid ) {

            //marca todos los campos como si fuesen tocados
            this.myForm.markAllAsTouched();
            return;
        }

        console.log(this.myForm.value);

        this.myForm.reset({ price: 10, inStorage: 0 });
    }

}
