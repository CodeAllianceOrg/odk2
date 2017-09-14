import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderElementsComponent } from './form-builder-elements.component';

import { SharedModule } from '../../shared/shared.module';

describe('FormBuilderElementsComponent', () => {
    let component: FormBuilderElementsComponent;
    let fixture: ComponentFixture<FormBuilderElementsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormBuilderElementsComponent ],
            imports: [
                SharedModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBuilderElementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
