import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IGroup, IAppState } from '../../store';
import { FormActions } from '../../app.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-form-builder-properties',
    templateUrl: './form-builder-properties.component.html',
    styleUrls: ['./form-builder-properties.component.css']
})
export class FormBuilderPropertiesComponent implements OnInit {

    @Input()
    public set groupId(groupId: number) {
        this.item$ = this.ngRedux
            .select(['entities', 'groups', groupId])
            .switchMap(
                (group: IGroup) => {
                    if (group && group.selectedElementId) {
                        return this.ngRedux.select(['entities', 'elements', group.selectedElementId]);
                    }

                    return Observable.of(group);
                }
            );
    }

    public item$: Observable<IGroup>;

    constructor(private formActions: FormActions,
                private ngRedux: NgRedux<IAppState>) {}

    ngOnInit() {}

    public onPropertyChange(value: any, itemId: number, field: string[]): void {
        this.formActions.updateSelected(field, value, itemId);
    }
}
