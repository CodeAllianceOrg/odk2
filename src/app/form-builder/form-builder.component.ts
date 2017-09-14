import { Component, OnInit, Input } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

    @Input()
    public form: any = {};

    @select(['selected', 'group'])
    public selectedGroupId$: Observable<number>;

    constructor() { }

    ngOnInit() {}
}
