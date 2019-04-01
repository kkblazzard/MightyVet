import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMentorsComponent } from './admin-mentors.component';

describe('AdminMentorsComponent', () => {
  let component: AdminMentorsComponent;
  let fixture: ComponentFixture<AdminMentorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMentorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
