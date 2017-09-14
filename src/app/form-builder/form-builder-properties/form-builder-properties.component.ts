import { Component, OnInit, Input } from '@angular/core';

import { FormActions } from '../../app.actions';

@Component({
    selector: 'app-form-builder-properties',
    templateUrl: './form-builder-properties.component.html',
    styleUrls: ['./form-builder-properties.component.css']
})
export class FormBuilderPropertiesComponent implements OnInit {

    @Input()
    public groupId = 0;

    constructor(private formActions: FormActions) { }

    ngOnInit() {}

    onDeleteSelectedItem() {
        this.formActions.remove(this.groupId);
    }
}
