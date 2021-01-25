import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsasPotroPracticasCardComponent } from './bolsas-potro-practicas-card.component';

describe('BolsasPotroPracticasCardComponent', () => {
  let component: BolsasPotroPracticasCardComponent;
  let fixture: ComponentFixture<BolsasPotroPracticasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolsasPotroPracticasCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsasPotroPracticasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
