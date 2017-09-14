import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderHeaderComponent } from './form-builder-header.component';

import { SharedModule } from '../../shared/shared.module';

describe('FormBuilderHeaderComponent', () => {
    let component: FormBuilderHeaderComponent;
    let fixture: ComponentFixture<FormBuilderHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormBuilderHeaderComponent ],
            imports: [
                SharedModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBuilderHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
