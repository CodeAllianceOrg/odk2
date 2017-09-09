import { Map, Record, List } from 'immutable';

export interface IGroup {
    id: number;
}

export const GroupRecord = Record({
    id: 0
});

export interface IElement {}

export interface IForm {
    id: number;
    name: string;

    groups: List<IGroup>;
}

export const FormRecord = Record({
    id: 0,
    name: 'Default Name',
    groups: List()
});

export interface IEntityStore {
    forms: Map<number, any>;
    groups: Map<number, any>;
}

export const ENTITIES_STORE_INITIAL_STATE: IEntityStore = {
    groups: Map<number, any>(),
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
