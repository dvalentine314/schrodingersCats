import { TestBed } from '@angular/core/testing';

import { WebRequestEmulatorService } from './web-request-emulator.service';

describe('WebRequestGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebRequestEmulatorService = TestBed.get(WebRequestEmulatorService);
    expect(service).toBeTruthy();
  });
});
