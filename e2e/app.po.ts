import {
    browser,
    by,
    element,
    ElementFinder,
    ExpectedConditions
} from 'protractor';

/***********************
 ** Utilities
 ***********************/

const guaranteedSendKeys = (elementFinder: ElementFinder, text: string) => {
    return elementFinder
        .clear()
        .then(
            () => elementFinder.sendKeys(text)
        )
        .then(
            () => elementFinder.getAttribute('value')
        )
        .then(
            insertedValue => {
                if (insertedValue !== text) {
                    // Failed, must send characters one at a time
                    elementFinder.clear();
                    for (let i = 0; i < text.length; i++) {
                        elementFinder.sendKeys(text.charAt(i));
                    }
                }
            }
        )
        .then(
            () =>
                // wait for sendKeys to propagate correctly, otherwise the text will not be
                // fully entered when dialog is closed
                browser.wait(
                    ExpectedConditions.textToBePresentInElementValue(
                        elementFinder,
                        text
                    )
                )
        );
};

/***********************
 ** App Page
 ***********************/

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }
}

export class Header {
    getBrandText() {
        return element(by.css('app-root nav.navbar .navbar-brand')).getText();
    }

    getLinksText() {
        return element.all(by.css('app-root nav.navbar li.nav-item')).map(ef => ef.getText());
    }
}

export class Editor {
    create = {
        createBlankForm() {
            return element(by.css('app-root .main button#new-form')).click();
        }
    };

    formName = {
        edit(text: string) {
            return guaranteedSendKeys(element(by.css('app-root .main input#form-name')), text);
        },
        get() {
            return element(by.css('app-root .main input#form-name')).getAttribute('value');
        }
    };

    openExportDialog() {
        return element(by.css('app-root .main button#export')).click();
    }
}

export class EditorTabs {
    currentTab = {
        getName() {
            return element(by.css('app-root .main .nav-tabs a.nav-link.active')).getText();
        }
    };

    count() {
        return element.all(by.css('app-root .main .tabs .nav.nav-tabs li.nav-item')).count();
    }
    getNames() {
        return element.all(by.css('app-root .main .tabs .nav.nav-tabs li.nav-item')).map(ef => ef.getText());
    }

    openTab(index: number) {
        return element.all(by.css('app-root .main a.nav-link')).get(index).click();
    }

    openCreateTab() {
        return element(by.cssContainingText('app-root .main a.nav-link', 'New Form')).click();
    }
}

export class EditorFormElements {
    getTitleText() {
        return element(by.css('app-root .main #form-elements h2')).getText();
    }

    getAllText() {
        return element.all(by.css('app-root .main #form-elements button')).map(ef => ef.getText());
    }

    disabled() {
        return element.all(by.css('app-root .main #form-elements button'))
            .map(
                ef => ef.getAttribute('disabled')
            )
            .then(
                arr => arr.reduce(
                    (acc, val) => Boolean(acc) && Boolean(val),
                    true
                )
            );
    }

    addTextElement() {
        return element(by.cssContainingText('app-root .main #form-elements button', 'Text')).click();
    }

    addNumericElement() {
        return element(by.cssContainingText('app-root .main #form-elements button', 'Numeric')).click();
    }

    addGPSElement() {
        return element(by.cssContainingText('app-root .main #form-elements button', 'GPS')).click();
    }

    addComboBoxElement() {
        return element(by.cssContainingText('app-root .main #form-elements button', 'Combo')).click();
    }

    addMultiSelectElement() {
        return element(by.cssContainingText('app-root .main #form-elements button', 'Multi')).click();
    }
}

export class EditorElementProperties {
    controls = {
        element() {
            return element(by.css('app-root .main #element-properties #element-properties-controls-container'));
        },
        delete() {
            return element(by.css('app-root .main #element-properties button#delete-selected')).click();
        }
    };

    getTitleText() {
        return element(by.css('app-root .main #element-properties h2')).getText();
    }
}

export class EditorGroups {
    elements = {
        count() {
            return element.all(by.css('app-root .main #groups .group-item .question-element-item')).count();
        },

        text: {
            get(groupIndex: number, elementIndex: number) {
                return element
                    .all(by.css('app-root .main #groups .group-item'))
                    .get(groupIndex)
                    .all(by.css('.text-question-element-item'))
                    .get(elementIndex);
            }
        },
        numeric: {
            get(groupIndex: number, elementIndex: number) {
                return element
                    .all(by.css('app-root .main #groups .group-item'))
                    .get(groupIndex)
                    .all(by.css('.numeric-question-element-item'))
                    .get(elementIndex);
            }
        },
        gps: {
            get(groupIndex: number, elementIndex: number) {
                return element
                    .all(by.css('app-root .main #groups .group-item'))
                    .get(groupIndex)
                    .all(by.css('.gps-question-element-item'))
                    .get(elementIndex);
            }
        },
        comboBox: {
            get(groupIndex: number, elementIndex: number) {
                return element
                    .all(by.css('app-root .main #groups .group-item'))
                    .get(groupIndex)
                    .all(by.css('.combo-box-question-element-item'))
                    .get(elementIndex);
            }
        },
        multiSelect: {
            get(groupIndex: number, elementIndex: number) {
                return element
                    .all(by.css('app-root .main #groups .group-item'))
                    .get(groupIndex)
                    .all(by.css('.multi-select-question-element-item'))
                    .get(elementIndex);
            }
        }
    };

    controls = {
        name: {
            edit(index: number, text: string) {
                return guaranteedSendKeys(
                    element.all(by.css('app-root .main #groups .group-item input.group-name')).get(index),
                    text
                );
            },
            get(index: number) {
                return element
                    .all(
                        by.css('app-root .main #groups .group-item input.group-name')
                    )
                    .get(index)
                    .getAttribute('value');
            }
        },
        shift: {
            down(index: number) {
                return element
                    .all(
                        by.css('app-root .main #groups .group-item')
                    )
                    .get(index)
                    .element(
                        by.css('button.shift-down')
                    )
                    .click();
            },
            up(index: number) {
                return element
                    .all(
                        by.css('app-root .main #groups .group-item')
                    )
                    .get(index)
                    .element(
                        by.css('button.shift-up')
                    )
                    .click();
            }
        }
    };

    getTitleText() {
        return element(by.css('app-root .main #groups h2')).getText();
    }
    addGroup() {
        return element(by.css('app-root .main #groups #add-group')).click();
    }
    getSelectedGroup() {
        return element(by.css('app-root .main #groups .group-item.active'));
    }
    getGroupId(index: number) {
        return element.all(by.css('app-root .main #groups .group-item')).get(index).getAttribute('data-id');
    }
    selectGroup(index: number) {
        return element.all(by.css('app-root .main #groups .group-item')).get(index).click();
    }
    count() {
        return element.all(by.css('app-root .main #groups .group-item')).count();
    }
}
