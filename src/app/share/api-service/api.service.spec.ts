import { TestBed } from '@angular/core/testing';
import { AppService } from '../app-service/app.service';

import { ApiService } from './api.service';

describe('ApiServiceService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
