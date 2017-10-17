import { Component, OnInit } from '@angular/core';

import { SelectionsService } from '../services/selections.service';
import { FileSaverService } from '../services/file-saver.service';

import {
    FormActions
} from '../app.actions';

import { IForm } from '../store';

import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

    public forms$: Observable<List<IForm>>;

    constructor(selections: SelectionsService,
                private formActions: FormActions,
                private fileService: FileSaverService) {
        this.forms$ = selections.forms$;
    }

    ngOnInit() {}

    onAddForm() {
        this.formActions.addBlankForm();
    }

    onUploadForm(file: File) {
        this.fileService.importSurvey(file);
    }

    tracker(_: undefined, obj: {id: number}): number | undefined {
        return obj ? obj.id : undefined;
    }
}
