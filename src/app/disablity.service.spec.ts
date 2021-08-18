import { TestBed } from '@angular/core/testing';

import { DisablityService } from './disablity.service';

describe('DisablityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisablityService = TestBed.get(DisablityService);
    expect(service).toBeTruthy();
  });
});
