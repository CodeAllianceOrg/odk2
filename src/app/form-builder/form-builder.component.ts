import { Component, OnInit, Input } from '@angular/core';

import { SelectionsService } from '../services/selections.service';

import {
    FormActions
} from '../app.actions';

import { IForm, IGroup } from '../store';

import { Map } from 'immutable';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

    @Input()
    public form: Map<number, any> = Map<number, any>();

    @select(['selected', 'group'])
    public selectedGroupId$: Observable<number>;

    constructor(private selections: SelectionsService,
                private formActions: FormActions) { }

    ngOnInit() {
    }

    onAddGroup(form: IForm) {
        this.formActions.addGroup(form.id);
    }

    onGroupNameChange(group: IGroup, name: string) {
        this.formActions.updateGroupName(name, group.id);
    }

    onSelectGroup(group: IGroup) {
        this.formActions.selectGroup(group.id);
    }

    onDeleteSelectedItem(id: number) {
        this.formActions.remove(id);
    }

    onAddTextElement() {
        this.formActions.addTextElement(
            this.selections.selectedGroupId()
        );
    }

    onAddNumericElement() {
        this.formActions.addNumericElement(
            this.selections.selectedGroupId()
        );
    }

    onAddGPSElement() {
        this.formActions.addGPSElement(
            this.selections.selectedGroupId()
        );
    }

    onAddComboBoxElement() {
        this.formActions.addComboBoxElement(
            this.selections.selectedGroupId()
        );
    }

    onAddMultiSelectElement() {
        this.formActions.addMultiSelectElement(
            this.selections.selectedGroupId()
        );
    }
}
