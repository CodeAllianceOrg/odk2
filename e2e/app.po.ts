import { browser, by, element } from 'protractor';

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
        }
    }
}
