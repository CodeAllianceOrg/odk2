import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState, initialState } from './store';
import { rootReducer } from './reducers';

import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';

import { FormBuilderModule } from './form-builder/form-builder.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TabsComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,

        FormBuilderModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, initialState, [createLogger()]);
    }
}
