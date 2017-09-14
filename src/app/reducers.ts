import { combineReducers, Reducer, AnyAction } from 'redux';

import { FormRecord, GroupRecord, ElementRecord } from './store';

import {
    FormActions
} from './app.actions';

import {
    IAppState,
    IEntityStore,
    ENTITIES_STORE_INITIAL_STATE,
    ISelectedStore,
    SELECTED_STORE_INITIAL_STATE
} from './store';

import { List, Map } from 'immutable';

export const entityReducer: Reducer<IEntityStore> = (
    previousState: IEntityStore = ENTITIES_STORE_INITIAL_STATE,
    action: AnyAction
): IEntityStore => {

    switch (action.type) {
    case FormActions.ADD_BLANK_FORM:
        const formId = Date.now();

        return {
            ...previousState,
            forms: previousState.forms.set(formId, new FormRecord({
                name: 'Default Name',
                id: formId
            }))
        };
    case FormActions.UPDATE_FORM_NAME:
        return {
            ...previousState,
            forms: previousState.forms.setIn([action.payload.formKey, 'name'], action.payload.name)
        };
    case FormActions.UPDATE_GROUP_NAME:
        return {
            ...previousState,
            groups: previousState.groups.setIn([action.payload.groupKey, 'name'], action.payload.name)
        };
    case FormActions.ADD_GROUP:
        const groupId = Date.now();
        const group = new GroupRecord({id: groupId});

        return {
            ...previousState,
            groups: previousState.groups.set(groupId, group),
            forms: previousState.forms.updateIn([action.payload, 'groups'], arr => arr.push(groupId))
        };
    case FormActions.ADD_TEXT_ELEMENT:
        const textElementId = Date.now();
        const textElement = new ElementRecord({id: textElementId, type: 'text'});

        return {
            ...previousState,
            elements: previousState.elements.set(textElementId, textElement),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(textElementId))
        };
    case FormActions.ADD_NUMERIC_ELEMENT:
        const numericElementId = Date.now();
        const numericElement = new ElementRecord({id: numericElementId, type: 'numeric'});

        return {
            ...previousState,
            elements: previousState.elements.set(numericElementId, numericElement),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(numericElementId))
        };
    case FormActions.REMOVE:

        /*
          should support removing an element, group or form
        */

        if (previousState.forms.has(action.payload)) {

        } else if (previousState.groups.has(action.payload)) {
            return {
                ...previousState,
                groups: previousState.groups.delete(action.payload),
                forms: <Map<number, any>> previousState.forms
                    .map(
                        (form, key) => form.update('groups', (arr: List<number>) => arr.filter( (elem: number) => elem !== action.payload ))
                    )
            };
        } else if (previousState.elements.has(action.payload)) {

        }

        return previousState;
    default:
        return previousState;
    }
};

export const selectionReducer: Reducer<ISelectedStore> = (
    previousState: ISelectedStore = SELECTED_STORE_INITIAL_STATE,
    action: AnyAction
): ISelectedStore => {

    switch (action.type) {
    case FormActions.SELECT_GROUP:
        return {
            group: action.payload
        };
    case FormActions.REMOVE:
        if (previousState.group === action.payload) {
            return {
                group: null
            };
        }

        return previousState;
    default:
        return previousState;
    }
};

export const rootReducer: Reducer<IAppState> = <Reducer<IAppState>> combineReducers({
    entities: entityReducer,
    selected: selectionReducer
});
