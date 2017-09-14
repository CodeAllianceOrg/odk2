import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderGroupsComponent } from './form-builder-groups.component';

import { SharedModule } from '../../shared/shared.module';

describe('FormBuilderGroupsComponent', () => {
    let component: FormBuilderGroupsComponent;
    let fixture: ComponentFixture<FormBuilderGroupsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormBuilderGroupsComponent ],
            imports: [
                SharedModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormBuilderGroupsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
