import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActvityComponent } from './actvity.component';

describe('ActvityComponent', () => {
  let component: ActvityComponent;
  let fixture: ComponentFixture<ActvityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActvityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActvityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
