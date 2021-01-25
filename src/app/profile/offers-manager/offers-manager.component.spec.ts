import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersManagerComponent } from './offers-manager.component';

describe('OffersManagerComponent', () => {
  let component: OffersManagerComponent;
  let fixture: ComponentFixture<OffersManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
