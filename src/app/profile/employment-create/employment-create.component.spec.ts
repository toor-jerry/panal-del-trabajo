import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentCreateComponent } from './employment-create.component';

describe('EmploymentCreateComponent', () => {
  let component: EmploymentCreateComponent;
  let fixture: ComponentFixture<EmploymentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
