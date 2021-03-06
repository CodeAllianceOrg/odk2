import {
    browser,
    by,
    element,
    ElementFinder,
    ExpectedConditions
} from 'protractor';

import * as path from 'path';

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

export class AboutPage {
  motivation = {
    content() {
      return element(by.css('app-root #section-motivation')).getText();
    }
  };

  tutorial = {
    content() {
      return element(by.css('app-root #section-tutorial')).getText();
    }
  };

  contact = {
    content() {
      return element(by.css('app-root #section-contact')).getText();
    }
  };

  navigateTo() {
    return browser.get('/about');
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
        },
        uploadExistingForm() {
            return element(by.css('app-root .main input#upload-form'))
                .clear()
                .then(
                    () => {
                        // then, upload the file
                        const fileName = './test_files/exampleForm.xlsx';
                        const absolutePath = path.resolve(__dirname, fileName);
                        return element(by.css('app-root .main input#upload-form')).sendKeys(absolutePath);
                    }
                );
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
        return element(by.cssContainingText('app-root .main a.nav-link', 'New Survey')).click();
    }
}

export class EditorFormElements {
    getTitleText() {
        return element(by.css('app-root .main #form-elements .section-header')).getText();
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

        name: {
            edit(text: string) {
                return guaranteedSendKeys(
                    element(by.css('app-root .main #element-properties input.element-name')),
                    text
                );
            },
            get() {
                return element(by.css('app-root .main #element-properties input.element-name'))
                    .getAttribute('value');
            }
        },

        required: {
            edit() {
                return element(by.css('app-root .main #element-properties label.element-required'))
                    .click();
            },
            get() {
                return element(by.css('app-root .main #element-properties input.element-required'))
                    .getAttribute('value');
            }
        },
        display: {
            edit(lang: string, text: string) {
                return guaranteedSendKeys(
                    element(by.css(`app-root .main #element-properties input.element-display-${lang}`)),
                    text
                );
            },
            get(lang: string) {
                return element(by.css(`app-root .main #element-properties input.element-display-${lang}`))
                    .getAttribute('value');
            },
            base: {
                edit(text: string) {
                    return guaranteedSendKeys(
                        element(by.css('app-root .main #element-properties input.element-display-base')),
                        text
                    );
                },
                get() {
                    return element(by.css('app-root .main #element-properties input.element-display-base'))
                        .getAttribute('value');
                }
            }
        }
    };

    getTitleText() {
        return element(by.css('app-root .main #element-properties .section-header')).getText();
    }
}

export class EditorGroups {
    elements = {

        getSelected() {
            return element.all(by.css('app-root .main #groups .group-item .question-element-item.active'));
        },
        count() {
            return element.all(by.css('app-root .main #groups .group-item .question-element-item')).count();
        },
        delete(groupIndex: number, elementIndex: number) {
            return element
                .all(by.css('app-root .main #groups .group-item'))
                .get(groupIndex)
                .all(by.css('.question-element-item button.element-delete'))
                .get(elementIndex)
                .click();
        },
        getId(groupIndex: number, elementIndex: number) {
            return element
                .all(by.css('app-root .main #groups .group-item'))
                .get(groupIndex)
                .all(by.css('.question-element-item'))
                .get(elementIndex)
                .getAttribute('data-id');
        },

        controls: {
            required: {
                get(groupIndex: number, elementIndex: number) {
                    return element
                        .all(by.css('app-root .main #groups .group-item'))
                        .get(groupIndex)
                        .all(by.css('.question-element-item .element-required'))
                        .get(elementIndex)
                        .getAttribute('data-required');
                }
            },
            shift: {
                down(groupIndex: number, elementIndex: number) {
                    return element
                        .all(by.css('app-root .main #groups .group-item'))
                        .get(groupIndex)
                        .all(by.css('.question-element-item button.element-shift-down'))
                        .get(elementIndex)
                        .click();
                },
                up(groupIndex: number, elementIndex: number) {
                    return element
                        .all(by.css('app-root .main #groups .group-item'))
                        .get(groupIndex)
                        .all(by.css('.question-element-item button.element-shift-up'))
                        .get(elementIndex)
                        .click();
                }
            }
        },

        text: {
            get(groupIndex: number, elementIndex: number) {
                return element
                    .all(by.css('app-root .main #groups .group-item'))
                    .get(groupIndex)
                    .all(by.css('.text-question-element-item'))
                    .get(elementIndex);
            },
            name: {
                get(groupIndex: number, elementIndex: number) {
                    return element
                        .all(by.css('app-root .main #groups .group-item'))
                        .get(groupIndex)
                        .all(by.css('.text-question-element-item .element-name'))
                        .get(elementIndex)
                        .getText();
                },
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
            get(index: number) {
                return element
                    .all(
                        by.css('app-root .main #groups .group-item .group-name')
                    )
                    .get(index)
                    .getText();
            }
        },
        display: {
            get(index: number, lang: string) {
                return element
                    .all(
                        by.css(`app-root .main #groups .group-item .group-display-${lang}`)
                    )
                    .get(index)
                    .getText();
            },
            base: {
                get(index: number) {
                    return element
                        .all(
                            by.css('app-root .main #groups .group-item .group-display-base')
                        )
                        .get(index)
                        .getText();
                }
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
        },
        delete(index: number) {
            return element
                .all(
                    by.css('app-root .main #groups .group-item')
                )
                .get(index)
                .element(
                    by.css('button.delete')
                )
                .click();
        }
    };

    getTitleText() {
        return element(by.css('app-root .main #groups .section-header')).getText();
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
        return element.all(by.css('app-root .main #groups .group-item button.select')).get(index).click();
    }
    count() {
        return element.all(by.css('app-root .main #groups .group-item')).count();
    }
}
