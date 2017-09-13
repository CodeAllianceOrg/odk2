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
        const elementId = Date.now();
        const element = new ElementRecord({id: elementId});

        return {
            ...previousState,
            elements: previousState.elements.set(elementId, element),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(elementId))
        };
    case FormActions.REMOVE:
        return {
            ...previousState,
            groups: previousState.groups.delete(action.payload),
            forms: previousState.forms
                .updateIn(
                    [action.payload, 'groups'],
                    arr => arr.filter( (elem: number) => elem !== action.payload )
                )
        };
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
    default:
        return previousState;
    }
};

export const rootReducer: Reducer<IAppState> = <Reducer<IAppState>> combineReducers({
    entities: entityReducer,
    selected: selectionReducer
});
