import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

import { SharedModule } from '../shared/shared.module';
import { FormBuilderModule } from '../form-builder/form-builder.module';

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TabsComponent
            ],
            imports: [
                SharedModule,
                FormBuilderModule
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
