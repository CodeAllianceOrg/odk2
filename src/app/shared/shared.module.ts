import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgReduxModule} from '@angular-redux/store';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {SelectionsService} from '../services/selections.service';
import {FileSaverService} from '../services/file-saver.service';

import {FormActions} from '../app.actions';

// AoT requires an exported function for factories

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgReduxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  exports: [
    FormsModule,
    NgbModule,
    NgReduxModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [
    FormActions,
    SelectionsService,
    FileSaverService
  ]
})
export class SharedModule {
}
