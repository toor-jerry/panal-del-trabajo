import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationCardComponent } from './postulation-card.component';

describe('PostulationCardComponent', () => {
  let component: PostulationCardComponent;
  let fixture: ComponentFixture<PostulationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
