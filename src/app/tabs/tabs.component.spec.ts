import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxTestingModule } from '@angular-redux/store/testing';

import { FormActions } from '../app.actions';

import { SelectionsService } from '../services/selections.service';

import { FormBuilderComponent } from '../form-builder/form-builder.component';

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TabsComponent,
                FormBuilderComponent
            ],
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
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
