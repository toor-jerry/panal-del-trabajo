import { TestBed } from '@angular/core/testing';

import { ModalUploadFileService } from './modal-upload-file.service';

describe('ModalUploadFileService', () => {
  let service: ModalUploadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUploadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
