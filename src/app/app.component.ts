import { Component } from '@angular/core';

import { SelectionsService } from './services/selections.service';

import {
    FormActions
} from './app.actions';

import { IForm, IGroup } from './store';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public forms$: Observable<List<IForm>>;

    @select(['selected', 'group'])
    public selectedGroupId$: Observable<number>;

    constructor(private selections: SelectionsService,
                private formActions: FormActions) {
        this.forms$ = selections.forms$;
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

    onAddForm() {
        this.formActions.addBlankForm();
    }

    onAddGroup(form: IForm) {
        this.formActions.addGroup(form.id);
    }

    onFormNameChange(form: IForm, name: string) {
        this.formActions.updateFormName(name, form.id);
    }

    onGroupNameChange(group: IGroup, name: string) {
        this.formActions.updateGroupName(name, group.id);
    }

    tracker(_: undefined, obj: {id: number}): number | undefined {
        return obj ? obj.id : undefined;
    }
}
