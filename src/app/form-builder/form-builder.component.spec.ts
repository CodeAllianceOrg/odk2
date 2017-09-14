import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';

import { SharedModule } from '../shared/shared.module';

import { FormBuilderHeaderComponent } from './form-builder-header/form-builder-header.component';
import { FormBuilderElementsComponent } from './form-builder-elements/form-builder-elements.component';
import { FormBuilderGroupsComponent } from './form-builder-groups/form-builder-groups.component';
import { FormBuilderPropertiesComponent } from './form-builder-properties/form-builder-properties.component';

describe('FormBuilderComponent', () => {
    let component: FormBuilderComponent;
    let fixture: ComponentFixture<FormBuilderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormBuilderComponent,
                FormBuilderHeaderComponent,
                FormBuilderElementsComponent,
                FormBuilderGroupsComponent,
                FormBuilderPropertiesComponent
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
