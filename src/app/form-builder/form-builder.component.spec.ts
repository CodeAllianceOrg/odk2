import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';

import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxTestingModule } from '@angular-redux/store/testing';

import { FormActions } from '../app.actions';

import { SelectionsService } from '../services/selections.service';

describe('FormBuilderComponent', () => {
    let component: FormBuilderComponent;
    let fixture: ComponentFixture<FormBuilderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormBuilderComponent ],
            imports: [
                NgbModule.forRoot(),
                NgReduxTestingModule,
                FormsModule
            ],
            providers: [
                SelectionsService,
                FormActions
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBuilderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
