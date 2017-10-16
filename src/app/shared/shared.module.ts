import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgReduxModule } from '@angular-redux/store';

import { SelectionsService } from '../services/selections.service';
import { FileSaverService } from '../services/file-saver.service';

import { FormActions } from '../app.actions';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        NgReduxModule
    ],
    declarations: [],
    exports: [
        FormsModule,
        NgbModule,
        NgReduxModule
    ],
    providers: [
        FormActions,
        SelectionsService,
        FileSaverService
    ]
})
export class SharedModule { }
