import { Injectable } from '@angular/core';
import {
    IAppState,
    IForm,
    FormRecord,
    IGroup,
    IElement
} from '../store';
import { FormActions } from '../app.actions';
import { NgRedux } from '@angular-redux/store';
import * as fileSaver from 'file-saver';
import { ODKSurvey, ISection, ISurvey } from 'odk2-format-converter';
import { Map } from 'immutable';

function s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

@Injectable()
export class FileSaverService {

    constructor(private ngRedux: NgRedux<IAppState>,
                private formActions: FormActions) {}

    public importSurvey(file: File): void {
        const reader = new FileReader();

        reader.onload = xlsxBase64 => {
            const form = new FormRecord({
                id: Date.now()
            });

            this.formActions.addExistingForm(form);
        };
        reader.readAsDataURL(file);
    }

    public exportSurvey(formId: number): void {
        const state = this.ngRedux.getState();

        const form: IForm & Map<number, any> = state.entities.forms.get(formId);

        const sections: ISection[] = [];

        form.groups.forEach(
            groupId => {
                const group: IGroup = state.entities.groups.get(<any> groupId);
                const elements: IElement[] = [];

                group.elements.forEach(
                    elementId => elements.push(state.entities.elements.get(<any> elementId))
                );

                sections.push({
                    section_name: group.properties.name,
                    questions: elements.map(
                        el => ({
                            type: <'text'> el.type,
                            name: el.properties.name,
                            required: el.properties.required,
                            'display.text': el.properties.display.base,
                            'display.text.spanish': el.properties.display.es
                        })
                    )
                });
            }
        );

        const survey: ISurvey = {
            title: form.properties.display.base,
            table_id: form.properties.name,
            sections
        };

        const odkSurvey = ODKSurvey.fromJSON(survey);

        const xlsxBinary = odkSurvey.toXLSXBinary();

        const xlsxBlob = new Blob([s2ab(xlsxBinary)], {type: ''});

        fileSaver.saveAs(xlsxBlob, `${form.getIn(['properties', 'name'])}.xlsx`);
    }
}
