import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

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
    expect(zone.enabled).toBe(false);
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBe(true);
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBe(true);
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.valid).toBe(false);
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.valid).toBe(false);
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    
  });
});