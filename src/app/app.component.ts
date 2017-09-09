import { Component } from '@angular/core';

import { SelectionsService } from './services/selections.service';
import {
    FormActions
} from './app.actions';
import { IForm } from './store';

import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public forms$: Observable<List<IForm>>;

    constructor(selections: SelectionsService,
                private formActions: FormActions) {
        this.forms$ = selections.forms$;
    }

    onAddForm() {
        this.formActions.addBlankForm();
    }

    onAddGroup(form: IForm) {
        this.formActions.addGroup(form.id);
    }

    updateFormName(form: IForm, name: string) {
        this.formActions.updateFormName(name, form.id);
    }

    trackForms(_: undefined, form: IForm): number | undefined {
        return form ? form.id : undefined;
    }
}
