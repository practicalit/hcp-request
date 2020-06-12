import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeProfessionalsComponent } from './awesome-professionals.component';

describe('AwesomeProfessionalsComponent', () => {
  let component: AwesomeProfessionalsComponent;
  let fixture: ComponentFixture<AwesomeProfessionalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwesomeProfessionalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
