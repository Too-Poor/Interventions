import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private types: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [ZonesValidator.longueurMinimum(1), ZonesValidator.longueurMaximum(50), Validators.required]],
      typeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: ['', Validators.required],
        courrielConfirmation: ['', Validators.required]
      }),
      telephone: [{value:'', disabled: true}]
    });

    this.types.obtenirTypeProbleme()
    .subscribe(type => this.typesProbleme = type,
               error => this.errorMessage = <any>error); 
  }

  appliquerNotifications(typeNotification: string): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    
    if (typeNotification == 'telephone') {
      //Vider et désactiver les zones courriel et confirmer courriel.
      courrielControl.clearValidators();
      courrielControl.reset();
      courrielControl.disable();
      
      courrielConfirmationControl.clearValidators();
      courrielConfirmationControl.reset();
      courrielConfirmationControl.disable();

      telephoneControl.enable();

    } else if (typeNotification == 'courriel') {
      telephoneControl.clearValidators();
      telephoneControl.reset();
      telephoneControl.disable();
      
      courrielControl.enable();
      courrielConfirmationControl.enable();

    } else {
      //!courriel && !telephone --> désactiver toutes les zones.
      telephoneControl.clearValidators();
      telephoneControl.reset();
      telephoneControl.disable();

      courrielControl.clearValidators();
      courrielControl.reset();
      courrielControl.disable();
      
      courrielConfirmationControl.clearValidators();
      courrielConfirmationControl.reset();
      courrielConfirmationControl.disable();
    }
    
  }
}