import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderComponent } from './form-builder.component';
import { FormBuilderHeaderComponent } from './form-builder-header/form-builder-header.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        FormBuilderComponent,
        FormBuilderHeaderComponent
    ],
    exports: [
        FormBuilderComponent,
        FormBuilderHeaderComponent
    ]
})
export class FormBuilderModule { }
