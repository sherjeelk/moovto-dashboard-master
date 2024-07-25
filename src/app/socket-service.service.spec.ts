import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';

describe('SocketServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketService = TestBed.get(SocketService);
    expect(service).toBeTruthy();
  });
});
