import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeVolunteersComponent } from './awesome-volunteers.component';

describe('AwesomeVolunteersComponent', () => {
  let component: AwesomeVolunteersComponent;
  let fixture: ComponentFixture<AwesomeVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwesomeVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
