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
            getTabsText() {
                return element.all(by.css('app-root .main .tabs .nav.nav-tabs li.nav-item')).map(ef => ef.getText());
            },
            openCreateDialog() {
                return element(by.css('app-root .main button#new-tab')).click();
            },
            openExportDialog() {
                return element(by.css('app-root .main button#export')).click();
            },

            formElements: {
                getTitleText() {
                    return element(by.css('app-root .main #form-elements h2')).getText();
                },
                getAllText() {
                    return element.all(by.css('app-root .main #form-elements button')).map(ef => ef.getText());
                }
            },

            elementProperties: {
                getTitleText() {
                    return element(by.css('app-root .main #element-properties h2')).getText();
                }
            },

            groups: {
                getTitleText() {
                    return element(by.css('app-root .main #groups h2')).getText();
                },
                addGroup() {
                    return element(by.css('app-root .main #groups #add-group')).click();
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
