import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderComponent } from './form-builder.component';
import { FormBuilderHeaderComponent } from './form-builder-header/form-builder-header.component';

import { SharedModule } from '../shared/shared.module';
import { FormBuilderElementsComponent } from './form-builder-elements/form-builder-elements.component';
import { FormBuilderGroupsComponent } from './form-builder-groups/form-builder-groups.component';
import { FormBuilderPropertiesComponent } from './form-builder-properties/form-builder-properties.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        FormBuilderComponent,
        FormBuilderHeaderComponent,
        FormBuilderElementsComponent,
        FormBuilderGroupsComponent,
        FormBuilderPropertiesComponent
    ],
    exports: [
        FormBuilderComponent
    ]
})
export class FormBuilderModule { }
