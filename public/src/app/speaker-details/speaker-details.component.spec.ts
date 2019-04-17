import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerDetailsComponent } from './speaker-details.component';

describe('SpeakerDetailsComponent', () => {
  let component: SpeakerDetailsComponent;
  let fixture: ComponentFixture<SpeakerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
