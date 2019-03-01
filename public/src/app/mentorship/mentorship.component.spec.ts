import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipComponent } from './mentorship.component';

describe('MentorshipComponent', () => {
  let component: MentorshipComponent;
  let fixture: ComponentFixture<MentorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
