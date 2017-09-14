import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { SelectionsService } from './services/selections.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState, initialState } from './store';
import { rootReducer } from './reducers';
import {
    FormActions
} from './app.actions';

import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TabsComponent,
        FormBuilderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        NgReduxModule
    ],
    providers: [
        SelectionsService,

        FormActions
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, initialState, [createLogger()]);
    }
}
