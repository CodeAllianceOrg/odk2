import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';

import { SharedModule } from '../shared/shared.module';

import { FormBuilderHeaderComponent } from './form-builder-header/form-builder-header.component';

describe('FormBuilderComponent', () => {
    let component: FormBuilderComponent;
    let fixture: ComponentFixture<FormBuilderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormBuilderComponent,
                FormBuilderHeaderComponent
            ],
            imports: [
                SharedModule
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
