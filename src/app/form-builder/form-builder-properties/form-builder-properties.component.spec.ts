import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderPropertiesComponent } from './form-builder-properties.component';

import { SharedModule } from '../../shared/shared.module';

describe('FormBuilderPropertiesComponent', () => {
    let component: FormBuilderPropertiesComponent;
    let fixture: ComponentFixture<FormBuilderPropertiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormBuilderPropertiesComponent ],
            imports: [
                SharedModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBuilderPropertiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
