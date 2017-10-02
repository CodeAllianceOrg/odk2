import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IGroup, IAppState } from '../../store';
import { FormActions } from '../../app.actions';

@Component({
    selector: 'app-form-builder-properties',
    templateUrl: './form-builder-properties.component.html',
    styleUrls: ['./form-builder-properties.component.css']
})
export class FormBuilderPropertiesComponent implements OnInit {

    @Input()
    public set groupId(groupId: number) {
        this.group$ = this.ngRedux.select(['entities', 'groups', groupId]);
    }

    public group$: Observable<IGroup>;

    constructor(private formActions: FormActions,
                private ngRedux: NgRedux<IAppState>) {}

    ngOnInit() {}

    public onDeleteSelectedItem(groupId: number): void {
        this.formActions.remove(groupId);
    }

    public onGroupPropertyChange(value: any, groupId: number, field: string[]): void {
        this.formActions.updateSelected(field, value, groupId);
    }
}
