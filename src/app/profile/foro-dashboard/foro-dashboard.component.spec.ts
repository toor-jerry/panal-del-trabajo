import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoDashboardComponent } from './foro-dashboard.component';

describe('ForoDashboardComponent', () => {
  let component: ForoDashboardComponent;
  let fixture: ComponentFixture<ForoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
