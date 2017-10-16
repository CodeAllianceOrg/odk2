import { TestBed, inject } from '@angular/core/testing';
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { FileSaverService } from './file-saver.service';

describe('FileSaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [FileSaverService],
        imports: [NgReduxTestingModule]
    });
  });

  it('should be created', inject([FileSaverService], (service: FileSaverService) => {
    expect(service).toBeTruthy();
  }));
});
