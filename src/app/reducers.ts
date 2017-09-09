import { combineReducers, Reducer, Action } from 'redux';

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
    action: Action
): IEntityStore => {

    switch (action.type) {
    case FormActions.ADD_BLANK_FORM:
        return {
            ...previousState,
            forms: previousState.forms.set(Date.now(), {})
        };
    default:
        return previousState;
    }
};

export const selectionReducer: Reducer<ISelectedStore> = (
    previousState: ISelectedStore = SELECTED_STORE_INITIAL_STATE,
    action: Action
): ISelectedStore => {

    switch (action.type) {

    }

    return previousState;
};

export const rootReducer: Reducer<IAppState> = <Reducer<IAppState>> combineReducers({
    entities: entityReducer,
    selected: selectionReducer
});
