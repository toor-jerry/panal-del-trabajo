import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContactsComponent } from './chat-contacts.component';

describe('ChatContactsComponent', () => {
  let component: ChatContactsComponent;
  let fixture: ComponentFixture<ChatContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
