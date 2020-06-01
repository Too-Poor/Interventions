import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;

  constructor(private fb: FormBuilder, private types: TypeproblemeService, private problemeService: ProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [ZonesValidator.longueurMinimum(1), ZonesValidator.longueurMaximum(50), Validators.required]],
      noTypeProbleme: ['', Validators.required],
      notification:['aucun'],
      courrielGroup: this.fb.group({
        courriel: [{value:'', disabled: true}],
        courrielConfirmation: [{value:'', disabled: true}]
      }),
      telephone: [{value:'', disabled: true}],
      descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
      noUnite: [''],
      dateProbleme: [new Date()]
    });

    this.types.obtenirTypeProbleme()
    .subscribe(type => this.typesProbleme = type,
               error => this.errorMessage = <any>error);

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(typeNotification: string): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');

    //Tout remettre à zéro
      telephoneControl.clearValidators();
      telephoneControl.reset();
      telephoneControl.disable();

      courrielControl.clearValidators();
      courrielControl.reset();
      courrielControl.disable();
      
      courrielConfirmationControl.clearValidators();
      courrielConfirmationControl.reset();
      courrielConfirmationControl.disable();

    if (typeNotification === 'courriel') {
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationControl.enable();
      courrielGroupControl.setValidators([emailMatcherValidator.courrielDifferents()]);

    } else if (typeNotification === 'telephone') {
      telephoneControl.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]);
      telephoneControl.enable();
    } 
    
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.probleme = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
         this.probleme.courrielConfirmation =  this.problemeForm.get('courrielGroup.courrielConfirmation').value;      
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } 
  }
  
  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée.  Nous vous remercions.';
  }
}