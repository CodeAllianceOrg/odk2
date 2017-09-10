import { Injectable } from '@angular/core';

import {
    IAppState,
    IEntityStore,
    IForm
} from '../store';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { List } from 'immutable';

@Injectable()
export class SelectionsService {

    constructor(private ngRedux: NgRedux<IAppState>) { }

    public selectedGroupId(): number | null {
        return this.ngRedux.getState().selected.group;
    }

    public get forms$(): Observable<List<IForm>> {
        return this.ngRedux
            .select(['entities'])
            .map(
                (entities: IEntityStore) => {
                    const forms = entities.forms.valueSeq().toList();

                    const groupsWithElements = entities.groups
                        .map(
                            group => group.update(
                                'elements',
                                (elements: List<number>) => elements.map((id: number) => entities.elements.get(id))
                            )
                        );

                    return forms
                        .map(
                            form => form.update('groups', (groups: List<number>) => groups.map((id: number) => groupsWithElements.get(id)))
                        )
                        .toList();
                }
            );
    }
}
