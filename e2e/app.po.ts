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

    getHeader() {
        return {
            getBrandText() {
                return element(by.css('app-root nav.navbar .navbar-brand')).getText();
            },
            getLinksText() {
                return element.all(by.css('app-root nav.navbar li.nav-item')).map(ef => ef.getText());
            }
        };
    }

    getEditor() {
        return {
            openExportDialog() {
                return element(by.css('app-root .main button#export')).click();
            },

            tabs: {
                count() {
                    return element.all(by.css('app-root .main .tabs .nav.nav-tabs li.nav-item')).count();
                },
                getNames() {
                    return element.all(by.css('app-root .main .tabs .nav.nav-tabs li.nav-item')).map(ef => ef.getText());
                },

                openTab(index: number) {
                    return element.all(by.css('app-root .main a.nav-link')).get(index).click();
                },

                openCreateTab() {
                    return element(by.cssContainingText('app-root .main a.nav-link', 'New Form')).click();
                },

                currentTab: {
                    getName() {
                        return element(by.css('app-root .main .nav-tabs a.nav-link.active')).getText();
                    }
                }
            },

            create: {
                createBlankForm() {
                    return element(by.css('app-root .main button#new-form')).click();
                }
            },

            formElements: {
                getTitleText() {
                    return element(by.css('app-root .main #form-elements h2')).getText();
                },
                getAllText() {
                    return element.all(by.css('app-root .main #form-elements button')).map(ef => ef.getText());
                },

                addText() {
                    return element(by.cssContainingText('app-root .main #form-elements button', 'Text')).click();
                }
            },

            elementProperties: {
                getTitleText() {
                    return element(by.css('app-root .main #element-properties h2')).getText();
                },

                controls: {
                    delete() {
                        return element(by.css('app-root .main #element-properties button#delete-selected')).click();
                    }
                }
            },

            groups: {
                getTitleText() {
                    return element(by.css('app-root .main #groups h2')).getText();
                },
                addGroup() {
                    return element(by.css('app-root .main #groups #add-group')).click();
                },
                selectGroup(index: number) {
                    return element.all(by.css('app-root .main #groups .group-item')).get(index).click();
                },
                count() {
                    return element.all(by.css('app-root .main #groups .group-item')).count();
                },

                elements: {
                    count() {
                        return element.all(by.css('app-root .main #groups .group-item .question-element-item')).count();
                    }
                },

                controls: {
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
                    }
                }
            },

            formName: {
                edit(text: string) {
                    return guaranteedSendKeys(element(by.css('app-root .main input#form-name')), text);
                },
                get() {
                    return element(by.css('app-root .main input#form-name')).getAttribute('value');
                }
            }
        };
    }
}
