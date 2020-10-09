import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedRequestsComponent } from './picked-requests.component';

describe('PickedRequestsComponent', () => {
  let component: PickedRequestsComponent;
  let fixture: ComponentFixture<PickedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
