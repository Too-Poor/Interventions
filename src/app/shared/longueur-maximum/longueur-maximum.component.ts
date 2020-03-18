import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {

    static longueurMaximum(longueur: number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if (valeurControle.value != null && valeurControle.value.trim().length <= longueur ) {
                return null;
            }
            return { 'nbreCaracteresExcedentaire': true};
        }
    };
}