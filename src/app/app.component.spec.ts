import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxTestingModule } from '@angular-redux/store/testing';

import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';

import { SharedModule } from './shared/shared.module';
import { FormBuilderModule } from './form-builder/form-builder.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,

                HeaderComponent,
                TabsComponent
            ],
            imports: [
                SharedModule,
                FormBuilderModule,

                NgReduxTestingModule
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
