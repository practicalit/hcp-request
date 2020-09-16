import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedRequetsComponent } from './picked-requets.component';

describe('PickedRequetsComponent', () => {
  let component: PickedRequetsComponent;
  let fixture: ComponentFixture<PickedRequetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickedRequetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedRequetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
