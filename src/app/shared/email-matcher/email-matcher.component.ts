import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {

    static courrielDifferents(): ValidatorFn {
        return (courrielGroup: AbstractControl): { [key: string]: boolean } | null => {
            if (!courrielGroup['controls'].courriel.value || !courrielGroup['controls'].courrielConfirmation.value) {
                return null;
            }
            return courrielGroup['controls'].courriel.value === 
                courrielGroup['controls'].courrielConfirmation.value ? null : { courrielDifferents: true };
        };
    }

    static courrielInvalide(): ValidatorFn {
        let regexCourriel = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+');

        return (courriel: AbstractControl): { [key: string]: boolean } | null => {
            if (regexCourriel.test(courriel.value)) {
                return null;
            }
            return { 'courrielInvalide': true };
            
        };
    }
}