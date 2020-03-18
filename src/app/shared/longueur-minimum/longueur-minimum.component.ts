import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator {
    
    static longueurMinimum(longueur: number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if (valeurControle.value != null && valeurControle.value.trim().length >= longueur ) {
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true };
        }
    };

    static longueurMaximum(longueur: number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if (valeurControle.value != null && valeurControle.value.trim().length <= longueur ) {
                return null;
            }
            return { 'nbreCaracteresExcedentaire': true };
        }
    };
}