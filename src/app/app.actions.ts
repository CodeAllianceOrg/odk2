import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import {
    IAppState,
    GroupRecord
} from './store';

@Injectable()
export class FormActions {
    static ADD_BLANK_FORM = 'FORM_ACTIONS-ADD_BLANK_FORM';
    static UPDATE_FORM_NAME = 'FORM_ACTIONS-UPDATE_FORM_NAME';

    static ADD_GROUP = 'FORM_ACTIONS-ADD_GROUP';
    static UPDATE_GROUP_NAME = 'FORM_ACTIONS-UPDATE_GROUP_NAME';

    static ADD_TEXT_ELEMENT = 'FORM_ACTIONS-ADD_TEXT_ELEMENT';
    static ADD_NUMERIC_ELEMENT = 'FORM_ACTIONS-ADD_NUMERIC_ELEMENT';
    static ADD_COMBO_BOX_ELEMENT = 'FORM_ACTIONS-ADD_COMBO_BOX_ELEMENT';
    static ADD_GPS_ELEMENT = 'FORM_ACTIONS-ADD_GPS_ELEMENT';
    static ADD_MULTI_SELECT_ELEMENT = 'FORM_ACTIONS-ADD_MULTI_SELECT_ELEMENT';

    static SELECT_GROUP = 'FORM_ACTIONS-SELECT_GROUP';

    static SHIFT_GROUP_DOWN = 'FORM_ACTIONS-SHIFT_GROUP_DOWN';
    static SHIFT_GROUP_UP = 'FORM_ACTIONS-SHIFT_GROUP_UP';

    static REMOVE = 'FORM_ACTIONS-REMOVE';

    constructor(private ngRedux: NgRedux<IAppState>) {}

    public remove(id: number): void {
        this.ngRedux.dispatch({
            type: FormActions.REMOVE,
            payload: id
        });
    }

    public addTextElement(groupKey: number | null): void {
        if (null !== groupKey) {
            this.ngRedux.dispatch({
                type: FormActions.ADD_TEXT_ELEMENT,
                payload: groupKey
            });
        }
    }

    public addNumericElement(groupKey: number | null): void {
        if (null !== groupKey) {
            this.ngRedux.dispatch({
                type: FormActions.ADD_NUMERIC_ELEMENT,
                payload: groupKey
            });
        }
    }

    public addGPSElement(groupKey: number | null): void {
        if (null !== groupKey) {
            this.ngRedux.dispatch({
                type: FormActions.ADD_GPS_ELEMENT,
                payload: groupKey
            });
        }
    }

    public addComboBoxElement(groupKey: number | null): void {
        if (null !== groupKey) {
            this.ngRedux.dispatch({
                type: FormActions.ADD_COMBO_BOX_ELEMENT,
                payload: groupKey
            });
        }
    }

    public addMultiSelectElement(groupKey: number | null): void {
        if (null !== groupKey) {
            this.ngRedux.dispatch({
                type: FormActions.ADD_MULTI_SELECT_ELEMENT,
                payload: groupKey
            });
        }
    }

    public addBlankForm(): void {
        this.ngRedux.dispatch({
            type: FormActions.ADD_BLANK_FORM,
            payload: null
        });
    }

    public addGroup(formKey: number): void {
        const group = new GroupRecord({
            id: Date.now()
        });

        this.ngRedux.dispatch({
            type: FormActions.ADD_GROUP,
            payload: group,
            meta: formKey
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

    public updateGroupName(name: string, groupKey: number): void {
        this.ngRedux.dispatch({
            type: FormActions.UPDATE_GROUP_NAME,
            payload: {
                groupKey,
                name
            }
        });
    }

    public selectGroup(groupKey: number): void {
        this.ngRedux.dispatch({
            type: FormActions.SELECT_GROUP,
            payload: groupKey
        });
    }

    public shiftGroupDown(groupKey: number): void {
        this.ngRedux.dispatch({
            type: FormActions.SHIFT_GROUP_DOWN,
            payload: groupKey
        });
    }

    public shiftGroupUp(groupKey: number): void {
        this.ngRedux.dispatch({
            type: FormActions.SHIFT_GROUP_UP,
            payload: groupKey
        });
    }
}
