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
}