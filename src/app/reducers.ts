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

    let itemId: number;

    switch (action.type) {
    case FormActions.ADD_BLANK_FORM:
        formId = Date.now();

        return {
            ...previousState,
            forms: previousState.forms.set(formId, new FormRecord({
                id: formId
            }))
        };
    case FormActions.UPDATE_SELECTED:
        itemId = action.payload.elementKey;

        if (previousState.elements.has(itemId)) {
            return {
                elements: previousState.elements
                    .setIn([action.payload.elementKey, 'properties', ...action.payload.field], action.payload.value),
                forms: previousState.forms,
                groups: previousState.groups
            };
        } else if (previousState.groups.has(itemId)) {
            return {
                elements: previousState.elements,
                forms: previousState.forms,
                groups: previousState.groups
                    .setIn([action.payload.elementKey, 'properties', ...action.payload.field], action.payload.value),
            };
        } else if (previousState.forms.has(itemId)) {
            return {
                elements: previousState.elements,
                forms: previousState.forms.setIn([action.payload.elementKey, 'properties', ...action.payload.field], action.payload.value),
                groups: previousState.groups
            };
        }

        return previousState;
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
            groups: previousState.groups
                .updateIn([action.payload, 'elements'], arr => arr.push(elementId))
                .setIn([action.payload, 'selectedElementId'], elementId)
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

            /*
              remove the group, remove its elements, and remove its reference
              in its parent form
            */

            return {
                ...previousState,
                groups: previousState.groups.delete(groupId),
                forms: <Map<number, any>> previousState.forms
                    .map(
                        (dirtyForm, key) => {
                            let updatedForm = dirtyForm
                                .update(
                                    'groups',
                                    (arr: List<number>) => arr.filter( (elem: number) => elem !== groupId )
                                );

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

            elementId = action.payload;

            /*
              remove the element and remove its reference in its parent group
            */

            return {
                ...previousState,
                elements: previousState.elements.delete(elementId),
                groups: <Map<number, any>> previousState.groups
                    .map(
                        (dirtyGroup, key) => {
                            let updatedGroup = dirtyGroup
                                .update(
                                    'elements',
                                    (arr: List<number>) => arr.filter( (elem: number) => elem !== elementId )
                                );

                            if (updatedGroup.get('selectedElementId') === elementId) {
                                updatedGroup = updatedGroup.delete('selectedElementId');
                            }

                            return updatedGroup;
                        }
                    )
            };
        }

        return previousState;
    case FormActions.SELECT_ELEMENT:

        elementId = action.payload.elementId;
        groupId = action.payload.groupId;

        return {
            ...previousState,
            groups: previousState.groups.setIn([groupId, 'selectedElementId'], elementId),
            forms: <Map<number, any>> previousState.forms
                .map(
                    (dirtyForm, key) => {
                        if (dirtyForm.groups.includes(groupId)) {
                            return dirtyForm.set('selectedGroupId', groupId);
                        }

                        return dirtyForm;
                    }
                )
        };
    case FormActions.SELECT_GROUP:

        groupId = action.payload;

        return {
            ...previousState,
            groups: previousState.groups.setIn([groupId, 'selectedElementId'], 0),
            forms: <Map<number, any>> previousState.forms
                .map(
                    (dirtyForm, key) => {
                        if (dirtyForm.groups.includes(groupId)) {
                            return dirtyForm.set('selectedGroupId', groupId);
                        }

                        return dirtyForm;
                    }
                )
        };
    case FormActions.SHIFT_ELEMENT_DOWN:

        elementId = action.payload;

        return {
            ...previousState,
            groups: <Map<number, any>> previousState.groups
                .map(
                    (dirtyGroup, key) => {
                        if (dirtyGroup.elements.includes(elementId)) {
                            const index = (<List<number>> dirtyGroup.elements)
                                .findIndex(
                                    listItem => listItem === elementId
                                );

                            return dirtyGroup
                                .set(
                                    'elements',
                                    dirtyGroup.elements.delete(index).insert(index + 1, elementId)
                                );
                        }

                        return dirtyGroup;
                    }
                )
        };
    case FormActions.SHIFT_ELEMENT_UP:

        elementId = action.payload;

        return {
            ...previousState,
            groups: <Map<number, any>> previousState.groups
                .map(
                    (dirtyGroup, key) => {
                        if (dirtyGroup.elements.includes(elementId)) {
                            const index = (<List<number>> dirtyGroup.elements)
                                .findIndex(
                                    listItem => listItem === elementId
                                );

                            return dirtyGroup
                                .set(
                                    'elements',
                                    dirtyGroup.elements.delete(index).insert(index - 1, elementId)
                                );
                        }

                        return dirtyGroup;
                    }
                )
        };
    case FormActions.SHIFT_GROUP_DOWN:

        groupId = action.payload;

        return {
            ...previousState,
            forms: <Map<number, any>> previousState.forms
                .map(
                    (dirtyForm, key) => {
                        if (dirtyForm.groups.includes(groupId)) {
                            const index = (<List<number>> dirtyForm.groups)
                                .findIndex(
                                    listItem => listItem === groupId
                                );

                            return dirtyForm
                                .set(
                                    'groups',
                                    dirtyForm.groups.delete(index).insert(index + 1, groupId)
                                );
                        }

                        return dirtyForm;
                    }
                )
        };
    case FormActions.SHIFT_GROUP_UP:

        groupId = action.payload;

        return {
            ...previousState,
            forms: <Map<number, any>> previousState.forms
                .map(
                    (dirtyForm, key) => {
                        if (dirtyForm.groups.includes(groupId)) {
                            const index = (<List<number>> dirtyForm.groups)
                                .findIndex(
                                    listItem => listItem === groupId
                                );

                            return dirtyForm
                                .set(
                                    'groups',
                                    dirtyForm.groups.delete(index).insert(index - 1, groupId)
                                );
                        }

                        return dirtyForm;
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
