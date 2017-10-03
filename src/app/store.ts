import { Map, Record, List } from 'immutable';

export interface IItemProperties {
    name: string;
    required: boolean;

    display: {
        base: string;
        es: string;
    };
}

export const DisplayRecord = Record({
    base: 'base',
    es: ''
});

export const ItemPropertiesRecord = Record({
    name: 'Untitled',
    required: true,

    display: new DisplayRecord()
});

export interface IElement {
    id: number;

    type: 'text' | 'numeric' | 'combo' | 'multi' | 'gps';
}

export const ElementRecord = Record({
    id: 0,
    type: 'text'
});

export interface IGroup {
    id: number;

    properties: IItemProperties;

    elements: List<IElement>;
}

export const GroupRecord = Record({
    id: 0,

    properties: new ItemPropertiesRecord(),

    elements: List()
});

export interface IForm {
    id: number;

    properties: IItemProperties;

    groups: List<IGroup>;

    selectedGroupId: number;
}

export const FormRecord = Record({
    id: 0,
    properties: new ItemPropertiesRecord(),
    groups: List(),
    selectedGroupId: 0
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

export interface IAppState {
    entities: IEntityStore;
}

export const initialState: IAppState = {
    entities: ENTITIES_STORE_INITIAL_STATE
};
