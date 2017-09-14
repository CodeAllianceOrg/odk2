import { Component, OnInit, Input } from '@angular/core';

import { FormActions } from '../../app.actions';

@Component({
    selector: 'app-form-builder-elements',
    templateUrl: './form-builder-elements.component.html',
    styleUrls: ['./form-builder-elements.component.css']
})
export class FormBuilderElementsComponent implements OnInit {

    @Input()
    public groupId: number = 0;

    constructor(private formActions: FormActions) { }

    ngOnInit() {}

    onAddTextElement() {
        this.formActions.addTextElement(
            this.groupId
        );
    }

    onAddNumericElement() {
        this.formActions.addNumericElement(
            this.groupId
        );
    }

    onAddGPSElement() {
        this.formActions.addGPSElement(
            this.groupId
        );
    }

    onAddComboBoxElement() {
        this.formActions.addComboBoxElement(
            this.groupId
        );
    }

    onAddMultiSelectElement() {
        this.formActions.addMultiSelectElement(
            this.groupId
        );
    }
}
