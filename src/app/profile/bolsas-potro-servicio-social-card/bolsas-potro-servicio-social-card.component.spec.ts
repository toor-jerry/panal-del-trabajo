import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsasPotroServicioSocialCardComponent } from './bolsas-potro-servicio-social-card.component';

describe('BolsasPotroServicioSocialCardComponent', () => {
  let component: BolsasPotroServicioSocialCardComponent;
  let fixture: ComponentFixture<BolsasPotroServicioSocialCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolsasPotroServicioSocialCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsasPotroServicioSocialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
