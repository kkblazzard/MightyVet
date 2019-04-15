import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartnersComponent } from './admin-partners.component';

describe('AdminPartnersComponent', () => {
  let component: AdminPartnersComponent;
  let fixture: ComponentFixture<AdminPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
