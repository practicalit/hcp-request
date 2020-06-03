import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleStateComponent } from './role-state.component';

describe('RoleStateComponent', () => {
  let component: RoleStateComponent;
  let fixture: ComponentFixture<RoleStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
