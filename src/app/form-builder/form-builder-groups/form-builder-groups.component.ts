import { Component, OnInit, Input } from '@angular/core';

import { FormActions } from '../../app.actions';

import { IForm, IGroup, IElement } from '../../store';

@Component({
    selector: 'app-form-builder-groups',
    templateUrl: './form-builder-groups.component.html',
    styleUrls: ['./form-builder-groups.component.css']
})
export class FormBuilderGroupsComponent implements OnInit {

    @Input()
    public form: any = {};

    @Input()
    public groupId = 0;

    constructor(private formActions: FormActions) { }

    ngOnInit() {}

    onAddGroup(form: IForm) {
        this.formActions.addGroup(form.id);
    }

    onGroupNameChange(group: IGroup, name: string) {
        this.formActions.updateSelected(['name'], name, group.id);
    }

    onSelectGroup(group: IGroup) {
        this.formActions.selectGroup(group.id);
    }

    onSelectElement(element: IElement) {
        this.formActions.selectElement(element.id);
    }

    onShiftGroupDown(group: IGroup) {
        this.formActions.shiftGroupDown(group.id);
    }

    onShiftGroupUp(group: IGroup) {
        this.formActions.shiftGroupUp(group.id);
    }

    onDeleteGroup(group: IGroup) {
        this.formActions.remove(group.id);
    }

    tracker(obj: any): number {
        return obj ? obj.id : null;
    }
}
