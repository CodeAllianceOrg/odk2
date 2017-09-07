import { Map, fromJS } from 'immutable';

export interface IGroup {}
export interface IElement {}
export interface IForm {}

export interface IEntityStore {
    forms: Map<number, IForm>;
    groups: Map<number, IGroup>;
    elements: Map<number, IElement>;
}

export const ENTITIES_STORE_INITIAL_STATE: IEntityStore = {
    groups: Map<number, IGroup>(),
    elements: Map<number, IElement>(),
    forms: Map<number, IForm>()
};

export interface ISelectedStore {
    group: number;
}

export const SELECTED_STORE_INITIAL_STATE: ISelectedStore = {
    group: null
};

export interface IAppState {
    entities: IEntityStore;
    selected: ISelectedStore;
}

export const initialState: IAppState = {
    entities: ENTITIES_STORE_INITIAL_STATE,
    selected: SELECTED_STORE_INITIAL_STATE
};
