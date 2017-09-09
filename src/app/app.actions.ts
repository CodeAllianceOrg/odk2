import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
    IAppState
} from './store';

@Injectable()
export class FormActions {
    static ADD_BLANK_FORM = 'FORM_ACTIONS-ADD_BLANK_FORM';

    static UPDATE_FORM_NAME = 'FORM_ACTIONS-UPDATE_FORM_NAME';

    static ADD_GROUP = 'FORM_ACTIONS-ADD_GROUP';

    constructor(private ngRedux: NgRedux<IAppState>) {}

    public addBlankForm(): void {
        this.ngRedux.dispatch({
            type: FormActions.ADD_BLANK_FORM,
            payload: null
        });
    }

    public addGroup(formKey: number): void {
        this.ngRedux.dispatch({
            type: FormActions.ADD_GROUP,
            payload: formKey
        });
    }

    public updateFormName(name: string, formKey: number): void {
        this.ngRedux.dispatch({
            type: FormActions.UPDATE_FORM_NAME,
            payload: {
                formKey,
                name
            }
        });
    }
}
