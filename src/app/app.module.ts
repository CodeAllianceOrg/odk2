import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {SharedModule} from './shared/shared.module';

import {NgRedux} from '@angular-redux/store';
import {createLogger} from 'redux-logger';
import {IAppState, initialState} from './store';
import {rootReducer} from './reducers';

import {HeaderComponent} from './header/header.component';
import {TabsComponent} from './tabs/tabs.component';
import {AboutComponent} from './about/about.component';
import {EditorComponent} from './editor/editor.component';

import {FormBuilderModule} from './form-builder/form-builder.module';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    AboutComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    FormBuilderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, initialState, [createLogger()]);
  }
}
