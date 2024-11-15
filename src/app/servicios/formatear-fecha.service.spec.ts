import { TestBed } from '@angular/core/testing';

import { FormatearFechaService } from './formatear-fecha.service';

describe('FormatearFechaService', () => {
  let service: FormatearFechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatearFechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
