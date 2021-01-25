import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentsManagerComponent } from './employments-manager.component';

describe('EmploymentsManagerComponent', () => {
  let component: EmploymentsManagerComponent;
  let fixture: ComponentFixture<EmploymentsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
