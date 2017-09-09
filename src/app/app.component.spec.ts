import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxTestingModule } from '@angular-redux/store/testing';

import { FormActions } from './app.actions';

import { SelectionsService } from './services/selections.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                NgbModule.forRoot(),
                NgReduxTestingModule
            ],
            providers: [
                SelectionsService,
                FormActions
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
