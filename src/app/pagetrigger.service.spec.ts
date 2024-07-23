import { TestBed } from '@angular/core/testing';

import { PagetriggerService } from './pagetrigger.service';

describe('PagetriggerService', () => {
  let service: PagetriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagetriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
