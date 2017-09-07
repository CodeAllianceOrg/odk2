import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
    IAppState
} from './store';

@Injectable()
export class FormActions {
    static ADD_BLANK_FORM = 'FORM_ACTIONS-ADD_BLANK_FORM';

    constructor(private ngRedux: NgRedux<IAppState>) {}

    public addBlankForm(): void {
        this.ngRedux.dispatch({
            type: FormActions.ADD_BLANK_FORM,
            payload: null
        });
    }
}
