import { Map, Record } from 'immutable';

export interface IGroup {}
export interface IElement {}

export interface IForm {
    id: number;
    name: string;
}

export const FormRecord = Record({
    id: 0,
    name: 'Default Name'
});

export interface IEntityStore {
    forms: Map<number, any>;
    groups: Map<number, IGroup>;
    elements: Map<number, IElement>;
}

export const ENTITIES_STORE_INITIAL_STATE: IEntityStore = {
    groups: Map<number, IGroup>(),
    elements: Map<number, IElement>(),
    forms: Map<number, any>().set(0, new FormRecord())
};

export interface ISelectedStore {
    group: number | null;
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
