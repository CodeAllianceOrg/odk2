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

    public get forms$(): Observable<List<IForm>> {
        return this.ngRedux
            .select(['entities'])
            .map(
                (entities: IEntityStore) => {
                    const forms = entities.forms.valueSeq().toList();

                    return forms
                        .map(
                            form => form.set('groups', form.get('groups').map((id: number) => entities.groups.get(id)))
                        )
                        .toList();
                }
            );
    }
}
