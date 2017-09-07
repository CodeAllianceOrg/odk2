import { Injectable } from '@angular/core';

import {
    IAppState,
    IForm
} from '../store';

import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { List, Map } from 'immutable';

@Injectable()
export class SelectionsService {

    constructor(private ngRedux: NgRedux<IAppState>) { }

    public get forms$(): Observable<List<IForm>> {
        return this.ngRedux
            .select(['entities', 'forms'])
            .map(
                (formsMap: Map<number, IForm>): List<IForm> => {
                    return formsMap.valueSeq().toList();
                }
            );
    }
}
