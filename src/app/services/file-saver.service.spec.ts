import { TestBed, inject } from '@angular/core/testing';
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { FileSaverService } from './file-saver.service';
import { FormActions } from '../app.actions';

describe('FileSaverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [FileSaverService, FormActions],
        imports: [NgReduxTestingModule]
    });
  });

  it('should be created', inject([FileSaverService], (service: FileSaverService) => {
    expect(service).toBeTruthy();
  }));
});
