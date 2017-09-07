import { browser, by, element } from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getHeader() {
        return {
            getBrandText() {
                return element(by.css('app-root .header .brand'));
            }
        }
    }

    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
}
