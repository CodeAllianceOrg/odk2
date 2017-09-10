import { Map, Record, List } from 'immutable';

export interface IElement {
    id: number;
}

export const ElementRecord = Record({
    id: 0
});

export interface IGroup {
    id: number;

    elements: List<IElement>;
}

export const GroupRecord = Record({
    id: 0,
    name: 'Default Group Name',

    elements: List()
});

export interface IForm {
    id: number;
    name: string;

    groups: List<IGroup>;
}

export const FormRecord = Record({
    id: 0,
    name: 'Default Form Name',
    groups: List()
});

export interface IEntityStore {
    forms: Map<number, any>;
    groups: Map<number, any>;
    elements: Map<number, any>;
}

export const ENTITIES_STORE_INITIAL_STATE: IEntityStore = {
    groups: Map<number, any>(),
    forms: Map<number, any>().set(0, new FormRecord()),
    elements: Map<number, any>()
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
