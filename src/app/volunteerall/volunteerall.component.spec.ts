import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerallComponent } from './volunteerall.component';

describe('VolunteerallComponent', () => {
  let component: VolunteerallComponent;
  let fixture: ComponentFixture<VolunteerallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
