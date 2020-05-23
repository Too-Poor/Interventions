import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], 
      declarations: [ProblemeComponent],
      providers: [TypeproblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = { };
    let zone = component.problemeForm.get('prenom');
    zone.setValue(null);
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let validator = ZonesValidator.longueurMinimum(3);
    let valeurControle = { value: '          ' };

    let result = validator(valeurControle as AbstractControl);

    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    let validator = ZonesValidator.longueurMinimum(3);
    let valeurControle = { value: '  x' };

    let result = validator(valeurControle as AbstractControl);

    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBe(false);
  });

  
  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBe(false);
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBe(false);
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('a');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('');
    zoneCourrielConfirmation.setValue('test@test.test');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielDifferents']).toBeUndefined();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('test@test.test');
    zoneCourrielConfirmation.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielDifferents']).toBeUndefined();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('test@test.test');
    zoneCourrielConfirmation.setValue('best@best.best');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielDifferents']).toBeTruthy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('test@test.test');
    zoneCourrielConfirmation.setValue('test@test.test');

    let groupe = component.problemeForm.get('courrielGroup');
    errors = groupe.errors || {};
    expect(errors['courrielDifferents']).toBeUndefined();
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte ', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte ', () => {
    component.appliquerNotifications('telephone');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('aaaaaaaaac');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789');
    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678901');
    errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('telephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1234567890');
    errors = zone.errors || {};
    expect(errors['minlength']).toBeUndefined();
  });
});