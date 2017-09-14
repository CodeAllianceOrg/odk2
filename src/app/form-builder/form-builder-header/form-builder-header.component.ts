import { Component, OnInit, Input } from '@angular/core';

import {
    FormActions
} from '../../app.actions';

@Component({
    selector: 'app-form-builder-header',
    templateUrl: './form-builder-header.component.html',
    styleUrls: ['./form-builder-header.component.css']
})
export class FormBuilderHeaderComponent implements OnInit {

    /*
      We'd like to type this, but we lack typed Records and
      using an Interface yields Angular errors
    */

    @Input()
    public form: any = {};

    constructor(private formActions: FormActions) { }

    ngOnInit() {
    }

    onFormNameChange(name: string) {
        this.formActions.updateFormName(name, this.form.id);
    }
}
