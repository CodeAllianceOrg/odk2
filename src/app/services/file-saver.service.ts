import { Injectable } from '@angular/core';
import {
    IAppState,
    IForm,
    FormRecord,
    IGroup,
    GroupRecord,
    IElement,
    ElementRecord,
    ItemPropertiesRecord
} from '../store';
import { FormActions } from '../app.actions';
import { NgRedux } from '@angular-redux/store';
import * as fileSaver from 'file-saver';
import { ODKSurvey, ISection, ISurvey } from 'odk2-format-converter';
import { Map, List } from 'immutable';

// from https://stackoverflow.com/a/35790786
interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

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

        reader.onload = (event: FileReaderEvent) => {

            // XLSX reader expects the base64 metadata prefix stripped
            const xlsxBase64 = event.target.result.substr(event.target.result.indexOf('base64,') + 'base64,'.length);

            const odkSurvey: ODKSurvey = ODKSurvey.fromXLSXBase64(xlsxBase64);

            let form = new FormRecord({
                id: Date.now()
            });
            const groupIds: number[] = [];

            const formJson: ISurvey = odkSurvey.toJSON();

            form = form.setIn(['properties', 'name'], formJson.title);

            // create the elements, assign them to their respective section

            formJson.sections.forEach(
                (section: ISection) => {
                    let group = new GroupRecord({id: Date.now()});
                    group = group.setIn(['properties', 'name'], section.section_name);

                    const elementIds: number[] = [];

                    section.questions.forEach(
                        question => {
                            const element = new ElementRecord({
                                id: Date.now(),
                                type: question.type,
                                properties: new ItemPropertiesRecord({
                                    name: question.name,
                                    required: question.required
                                })
                            });

                            elementIds.push(element.get('id'));

                            this.formActions.addExistingElement(element);
                        }
                    );

                    group = group.set('elements', List(elementIds));

                    this.formActions.addExistingGroup(group);

                    groupIds.push(group.get('id'));
                }
            );

            form = form.set('groups', List(groupIds));

            // finally, add this form to the internal database

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
