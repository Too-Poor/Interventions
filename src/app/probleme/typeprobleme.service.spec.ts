import { TestBed } from '@angular/core/testing';

import { TypeproblemeService } from './typeprobleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('TypeproblemeService', () => {
  let service: TypeproblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TypeproblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
