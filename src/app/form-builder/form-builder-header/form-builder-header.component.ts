import { Component, OnInit, Input } from '@angular/core';

import {
    FormActions
} from '../../app.actions';

import { FileSaverService } from '../../services/file-saver.service';

@Component({
    selector: 'app-form-builder-header',
    templateUrl: './form-builder-header.component.html',
    styleUrls: ['./form-builder-header.component.css']
})
export class FormBuilderHeaderComponent implements OnInit {

    /*
      We'd like to type this, but we lack typed Records and
      using an Interface yields Angular errors
    */

    @Input()
    public form: any = {};

    constructor(private formActions: FormActions,
                private fileSaverService: FileSaverService) { }

    ngOnInit() {
    }

    onFormNameChange(name: string) {
        this.formActions.updateSelected(['name'], name, this.form.id);
    }

    saveAs(): void {
        this.fileSaverService.exportSurvey(this.form.id);
    }
}
