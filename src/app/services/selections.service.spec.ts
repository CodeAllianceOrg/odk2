import { TestBed, inject } from '@angular/core/testing';

import { SelectionsService } from './selections.service';

import { NgReduxTestingModule } from '@angular-redux/store/testing';

describe('SelectionsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SelectionsService],
            imports: [
                NgReduxTestingModule
            ]
        });
    });

    it('should be created', inject([SelectionsService], (service: SelectionsService) => {
        expect(service).toBeTruthy();
    }));
});
