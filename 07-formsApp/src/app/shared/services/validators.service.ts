import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  // Validator name
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  // Validator email
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // Validator username
  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

    const value: string = control.value.toLowerCase();

    // Si da error devuelvo un objeto con el mensaje del error
    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    // Si no da error
    return null;
  }

  // Validator Campo: Comprueba si en el campo hay errores cuando toca
  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors
    && form.controls[field].touched;
  }

  // Validator Campo1 igual a Campo2
  public isFieldOneEqualFieldTwo( field1: string, field2: string) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      // Saco los valores de las cajas de texto del formulario
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      // Si los campos son diferentes devuelvo un objeto con el mensaje error
      if ( fieldValue1 !== fieldValue2 ) {
        // Establezco el error en el input field2
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      //Si los campos son iguales
      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }



}
