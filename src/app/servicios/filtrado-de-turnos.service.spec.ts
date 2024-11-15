import { TestBed } from '@angular/core/testing';

import { FiltradoDeTurnosService } from './filtrado-de-turnos.service';

describe('FiltradoDeTurnosService', () => {
  let service: FiltradoDeTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltradoDeTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
