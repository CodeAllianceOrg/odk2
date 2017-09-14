import { combineReducers, Reducer, AnyAction } from 'redux';

import { FormRecord, ElementRecord } from './store';

import {
    FormActions
} from './app.actions';

import {
    IAppState,
    IEntityStore,
    ENTITIES_STORE_INITIAL_STATE
} from './store';

import { List, Map } from 'immutable';

export const entityReducer: Reducer<IEntityStore> = (
    previousState: IEntityStore = ENTITIES_STORE_INITIAL_STATE,
    action: AnyAction
): IEntityStore => {

    let elementId: number;
    let element: Map<string, any>;

    let groupId: number;
    let group: Map<string, any>;

    let formId: number;
    let form: Map<string, any>;

    switch (action.type) {
    case FormActions.ADD_BLANK_FORM:
        formId = Date.now();

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
        groupId = action.payload.id;
        group = action.payload;

        formId = action.meta;
        form = previousState.forms.get(formId);

        form = form.update('groups', arr => arr.push(groupId));
        form = form.set('selectedGroupId', groupId);

        return {
            ...previousState,
            groups: previousState.groups.set(groupId, group),
            forms: previousState.forms.set(formId, form)
        };
    case FormActions.ADD_TEXT_ELEMENT:
        elementId = Date.now();
        element = new ElementRecord({id: elementId, type: 'text'});

        return {
            ...previousState,
            elements: previousState.elements.set(elementId, element),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(elementId))
        };
    case FormActions.ADD_NUMERIC_ELEMENT:
        elementId = Date.now();
        element = new ElementRecord({id: elementId, type: 'numeric'});

        return {
            ...previousState,
            elements: previousState.elements.set(elementId, element),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(elementId))
        };
    case FormActions.ADD_GPS_ELEMENT:
        elementId = Date.now();
        element = new ElementRecord({id: elementId, type: 'gps'});

        return {
            ...previousState,
            elements: previousState.elements.set(elementId, element),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(elementId))
        };
    case FormActions.ADD_COMBO_BOX_ELEMENT:
        elementId = Date.now();
        element = new ElementRecord({id: elementId, type: 'combo'});

        return {
            ...previousState,
            elements: previousState.elements.set(elementId, element),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(elementId))
        };
    case FormActions.ADD_MULTI_SELECT_ELEMENT:
        elementId = Date.now();
        element = new ElementRecord({id: elementId, type: 'multi'});

        return {
            ...previousState,
            elements: previousState.elements.set(elementId, element),
            groups: previousState.groups.updateIn([action.payload, 'elements'], arr => arr.push(elementId))
        };
    case FormActions.REMOVE:

        /*
          should support removing an element, group or form
        */

        if (previousState.forms.has(action.payload)) {

        } else if (previousState.groups.has(action.payload)) {

            groupId = action.payload;

            return {
                ...previousState,
                groups: previousState.groups.delete(groupId),
                forms: <Map<number, any>> previousState.forms
                    .map(
                        (form, key) => {
                            let updatedForm = form.update('groups', (arr: List<number>) => arr.filter( (elem: number) => elem !== groupId ));

                            if (updatedForm.get('selectedGroupId') === groupId) {
                                updatedForm = updatedForm.delete('selectedGroupId');
                            }

                            return updatedForm;
                        }
                    ),
                elements: previousState.elements.reduce(
                    (acc: Map<number, any>, _, key) => {
                        if (previousState.groups.getIn([groupId, 'elements']).includes(key)) {
                            return acc.delete(Number(key));
                        }

                        return acc;
                    },
                    previousState.elements
                )
            };
        } else if (previousState.elements.has(action.payload)) {

        }

        return previousState;
    case FormActions.SELECT_GROUP:

        groupId = action.payload;

        return {
            ...previousState,
            forms: <Map<number, any>> previousState.forms
                .map(
                    (form, key) => {
                        if (form.groups.includes(groupId)) {
                            return form.set('selectedGroupId', groupId);
                        }

                        return form;
                    }
                )
        };
    default:
        return previousState;
    }
};

export const rootReducer: Reducer<IAppState> = <Reducer<IAppState>> combineReducers({
    entities: entityReducer
});
